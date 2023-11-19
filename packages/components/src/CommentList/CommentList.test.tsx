import { render } from '../tests/utils'
import {
  Default,
  WithDeepNestedReplies,
  WithReplies,
} from './CommentList.stories'
import { CommentList } from './CommentList'

describe('CommentList', () => {
  it('renders a list of items', () => {
    const { getByText } = render(<CommentList {...Default.args} />)

    const commentText = Default.args.comments[0].text.split(' ')[0]
    expect(getByText(new RegExp(commentText))).toBeInTheDocument()
  })

  it('supports nested comments', () => {
    const { getByText } = render(<CommentList {...WithReplies.args} />)
    const replyText = (
      WithReplies.args.comments[0] as any
    ).replies[0].text.split(' ')[0]

    expect(getByText(/3\s*replies/)).toBeInTheDocument()

    // Replies hidden by default
    expect(() => getByText(new RegExp(replyText))).toThrow()

    const replyCta = getByText(/replies/)
    replyCta.click()

    // Replies visible after clicking on the CTA
    expect(getByText(new RegExp(replyText))).toBeInTheDocument()

    replyCta.click()

    // Replies hidden after clicking on the CTA again
    expect(() => getByText(new RegExp(replyText))).toThrow()
  })

  it('supports deeply nested comments', () => {
    const { getByText } = render(
      <CommentList {...WithDeepNestedReplies.args} />,
    )
    const replyText = (
      WithDeepNestedReplies.args.comments[0] as any
    ).replies[0].text.split(' ')[0]

    expect(getByText(/1\s*reply/)).toBeInTheDocument()

    // Replies hidden by default
    expect(() => getByText(new RegExp(replyText))).toThrow()

    const replyCta = getByText(/1\s*reply/)
    replyCta.click()

    // Replies visible after clicking on the CTA
    expect(getByText(new RegExp(replyText))).toBeInTheDocument()
  })
})