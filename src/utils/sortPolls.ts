import type { APIGetIEventsResponse } from "../lib/types";

export const enum SortBy {
  Newest = "Newest",
  Oldest = "Oldest",
  MinusVotes = "MinusVotes",
  PlusVotes = "PlusVotes",
}

export const sortPolls = (
  polls: APIGetIEventsResponse["events"],
  sortBy: SortBy
) => {
  switch (sortBy) {
    case SortBy.Newest:
      return polls.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case SortBy.Oldest:
      return polls.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case SortBy.MinusVotes:
      return polls.sort(
        (a, b) =>
          a.positiveVotesInt +
          a.negativeVotesInt -
          (b.positiveVotesInt + b.negativeVotesInt)
      );
    case SortBy.PlusVotes:
      return polls.sort(
        (a, b) =>
          b.positiveVotesInt +
          b.negativeVotesInt -
          (a.positiveVotesInt + a.negativeVotesInt)
      );
  }
};
