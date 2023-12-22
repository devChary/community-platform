import { action, makeObservable, toJS } from 'mobx'
import { createContext, useContext } from 'react'
import { cloneDeep } from 'lodash'
import { logger } from 'src/logger'
import { ModuleStore } from '../common/module.store'
import {
  hasAdminRights,
  isAllowedToEditContent,
  randomID,
} from 'src/utils/helpers'
import { getUserCountry } from 'src/utils/getUserCountry'
import { MAX_COMMENT_LENGTH } from 'src/constants'
import type { DocReference } from '../databaseV2/DocReference'
import type {
  IDiscussion,
  IDiscussionComment,
} from 'src/models/discussion.models'
import type { IUserPPDB, UserComment } from 'src/models'
import type { RootStore } from '..'
import { changeUserReferenceToPlainText } from '../common/mentions'

const COLLECTION_NAME = 'discussions'

export class DiscussionStore extends ModuleStore {
  constructor(rootStore: RootStore) {
    super(rootStore)
    makeObservable(this)
  }

  public async fetchDiscussion(sourceId: string): Promise<IDiscussion | null> {
    return (
      toJS(
        await this.db
          .collection<IDiscussion>(COLLECTION_NAME)
          .getWhere('sourceId', '==', sourceId),
      )[0] || null
    )
  }

  public formatComments(
    item: any,
    comments: IDiscussionComment[],
  ): { comments: UserComment[]; count: number } {
    const commentCount = comments.length

    const formatedComments = comments.map((comment: IDiscussionComment) => {
      return {
        ...comment,
        text: changeUserReferenceToPlainText(comment.text),
        isUserVerified:
          !!this.aggregationsStore.aggregations.users_verified?.[
            comment.creatorName
          ],
        isEditable:
          [
            this.userStore.activeUser?._id,
            this.userStore.activeUser?.userName,
          ].includes(comment._creatorId) ||
          isAllowedToEditContent(item, this.userStore.activeUser),
        showReplies: false,
      }
    })

    return { comments: formatedComments, count: commentCount }
  }

  public async uploadDiscussion(
    sourceId: string,
    sourceType: string,
  ): Promise<IDiscussion | undefined> {
    const newDiscussion: IDiscussion = {
      _id: randomID(),
      sourceId,
      sourceType,
      comments: [],
    }

    const dbRef = await this.db
      .collection<IDiscussion>(COLLECTION_NAME)
      .doc(newDiscussion._id)

    return this._updateDiscussion(dbRef, newDiscussion)
  }

  @action
  public async addComment(
    discussion: IDiscussion,
    text: string,
    commentId?: string,
  ): Promise<IDiscussion | undefined> {
    try {
      const user = this.activeUser
      const comment = text.slice(0, MAX_COMMENT_LENGTH).trim()

      if (user && comment) {
        const dbRef = this.db
          .collection<IDiscussion>(COLLECTION_NAME)
          .doc(discussion._id)

        const currentDiscussion = toJS(await dbRef.get())

        const newComment: IDiscussionComment = {
          _id: randomID(),
          _created: new Date().toISOString(),
          _creatorId: user._id,
          creatorName: user.userName,
          creatorCountry: getUserCountry(user),
          text: comment,
          parentCommentId: commentId,
        }

        if (currentDiscussion) {
          currentDiscussion.comments.push(newComment)

          return this._updateDiscussion(dbRef, currentDiscussion)
        }
      }
    } catch (err) {
      logger.error(err)
      throw new Error(err?.message)
    }
  }

  @action
  public async editComment(
    discussion: IDiscussion,
    commentId: string,
    text: string,
  ): Promise<IDiscussion | undefined> {
    try {
      const user = this.activeUser
      const comment = text.slice(0, MAX_COMMENT_LENGTH).trim()

      if (user && comment) {
        const dbRef = this.db
          .collection<IDiscussion>(COLLECTION_NAME)
          .doc(discussion._id)

        const currentDiscussion = toJS(await dbRef.get())

        if (currentDiscussion) {
          const targetComment = currentDiscussion.comments.find(
            (comment) => comment._id === commentId,
          )

          if (targetComment?._creatorId !== user._id) {
            throw new Error('Comment not editable by user')
          }

          currentDiscussion.comments = this._findAndUpdateComment(
            user,
            currentDiscussion.comments,
            text,
            commentId,
          )

          return this._updateDiscussion(dbRef, currentDiscussion)
        }
      }
    } catch (err) {
      logger.error(err)
      throw new Error(err?.message)
    }
  }

  @action
  public async deleteComment(
    discussion: IDiscussion,
    commentId: string,
  ): Promise<IDiscussion | undefined> {
    try {
      const user = this.activeUser

      if (user) {
        const dbRef = this.db
          .collection<IDiscussion>(COLLECTION_NAME)
          .doc(discussion._id)

        const currentDiscussion = toJS(await dbRef.get())

        if (currentDiscussion) {
          const targetComment = currentDiscussion.comments.find(
            (comment) => comment._id === commentId,
          )

          if (targetComment?._creatorId !== user._id) {
            throw new Error('Comment not editable by user')
          }

          currentDiscussion.comments = this._findAndDeleteComment(
            user,
            currentDiscussion.comments,
            commentId,
          )

          return this._updateDiscussion(dbRef, currentDiscussion)
        }
      }
    } catch (err) {
      logger.error(err)
      throw new Error(err?.message)
    }
  }

  private _findAndUpdateComment(
    user: IUserPPDB,
    comments: IDiscussionComment[],
    newCommentText: string,
    commentId: string,
  ) {
    return comments.map((comment) => {
      // eslint-disable-next-line no-console
      console.log({
        matchesCommentAuthor:
          comment._creatorId === user._id || hasAdminRights(user),

        commentId: comment._id,
        commentIdToEdit: commentId,
      })
      if (
        (comment._creatorId === user._id || hasAdminRights(user)) &&
        comment._id == commentId
      ) {
        comment.text = newCommentText
        comment._edited = new Date().toISOString()
      }
      return comment
    })
  }

  private async _updateDiscussion(
    dbRef: DocReference<IDiscussion>,
    discussion: IDiscussion,
  ) {
    await dbRef.set({ ...cloneDeep(discussion) })

    return toJS(dbRef.get())
  }

  private _findAndDeleteComment(
    user: IUserPPDB,
    comments: IDiscussionComment[],
    commentId: string,
  ) {
    return comments.filter((comment) => {
      return !(
        (comment._creatorId === user._id || hasAdminRights(user)) &&
        comment._id === commentId
      )
    })
  }
}

export const DiscussionStoreContext = createContext<DiscussionStore>(
  null as any,
)
export const useDiscussionStore = () => useContext(DiscussionStoreContext)
