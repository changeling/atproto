import * as GetAuthorFeed from '../../../../lexicon/types/app/bsky/feed/getAuthorFeed';
import * as GetTimeline from '../../../../lexicon/types/app/bsky/feed/getTimeline';
export declare const rowToFeedItem: (row: FeedRow) => FeedItem;
export declare enum FeedAlgorithm {
    Firehose = "firehose",
    ReverseChronological = "reverse-chronological"
}
declare type FeedItem = GetAuthorFeed.FeedItem & GetTimeline.FeedItem;
declare type FeedRow = {
    type: 'post' | 'repost';
    postUri: string;
    postCid: string;
    cursor: string;
    recordBytes: Uint8Array;
    indexedAt: string;
    authorDid: string;
    authorHandle: string;
    authorDisplayName: string | null;
    originatorDid: string;
    originatorHandle: string;
    originatorDisplayName: string | null;
    likeCount: number;
    repostCount: number;
    replyCount: number;
    requesterRepost: string | null;
    requesterLike: string | null;
};
export {};
