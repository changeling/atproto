import { Server as XrpcServer } from '@atproto/xrpc-server';
import * as ComAtprotoAccountCreate from './types/com/atproto/account/create';
import * as ComAtprotoAccountCreateInviteCode from './types/com/atproto/account/createInviteCode';
import * as ComAtprotoAccountDelete from './types/com/atproto/account/delete';
import * as ComAtprotoAccountGet from './types/com/atproto/account/get';
import * as ComAtprotoAccountRequestPasswordReset from './types/com/atproto/account/requestPasswordReset';
import * as ComAtprotoAccountResetPassword from './types/com/atproto/account/resetPassword';
import * as ComAtprotoHandleResolve from './types/com/atproto/handle/resolve';
import * as ComAtprotoRepoBatchWrite from './types/com/atproto/repo/batchWrite';
import * as ComAtprotoRepoCreateRecord from './types/com/atproto/repo/createRecord';
import * as ComAtprotoRepoDeleteRecord from './types/com/atproto/repo/deleteRecord';
import * as ComAtprotoRepoDescribe from './types/com/atproto/repo/describe';
import * as ComAtprotoRepoGetRecord from './types/com/atproto/repo/getRecord';
import * as ComAtprotoRepoListRecords from './types/com/atproto/repo/listRecords';
import * as ComAtprotoRepoPutRecord from './types/com/atproto/repo/putRecord';
import * as ComAtprotoServerGetAccountsConfig from './types/com/atproto/server/getAccountsConfig';
import * as ComAtprotoSessionCreate from './types/com/atproto/session/create';
import * as ComAtprotoSessionDelete from './types/com/atproto/session/delete';
import * as ComAtprotoSessionGet from './types/com/atproto/session/get';
import * as ComAtprotoSessionRefresh from './types/com/atproto/session/refresh';
import * as ComAtprotoSyncGetRepo from './types/com/atproto/sync/getRepo';
import * as ComAtprotoSyncGetRoot from './types/com/atproto/sync/getRoot';
import * as ComAtprotoSyncUpdateRepo from './types/com/atproto/sync/updateRepo';
import * as AppBskyActorGetProfile from './types/app/bsky/actor/getProfile';
import * as AppBskyActorSearch from './types/app/bsky/actor/search';
import * as AppBskyActorSearchTypeahead from './types/app/bsky/actor/searchTypeahead';
import * as AppBskyActorUpdateProfile from './types/app/bsky/actor/updateProfile';
import * as AppBskyFeedGetAuthorFeed from './types/app/bsky/feed/getAuthorFeed';
import * as AppBskyFeedGetLikedBy from './types/app/bsky/feed/getLikedBy';
import * as AppBskyFeedGetPostThread from './types/app/bsky/feed/getPostThread';
import * as AppBskyFeedGetRepostedBy from './types/app/bsky/feed/getRepostedBy';
import * as AppBskyFeedGetTimeline from './types/app/bsky/feed/getTimeline';
import * as AppBskyGraphGetFollowers from './types/app/bsky/graph/getFollowers';
import * as AppBskyGraphGetFollows from './types/app/bsky/graph/getFollows';
import * as AppBskyNotificationGetCount from './types/app/bsky/notification/getCount';
import * as AppBskyNotificationList from './types/app/bsky/notification/list';
import * as AppBskyNotificationUpdateSeen from './types/app/bsky/notification/updateSeen';
export declare const APP_BSKY_SYSTEM: {
    ActorScene: string;
    ActorUser: string;
};
export declare function createServer(): Server;
export declare class Server {
    xrpc: XrpcServer;
    com: ComNS;
    app: AppNS;
    constructor();
}
export declare class ComNS {
    _server: Server;
    atproto: AtprotoNS;
    constructor(server: Server);
}
export declare class AtprotoNS {
    _server: Server;
    account: AccountNS;
    handle: HandleNS;
    repo: RepoNS;
    server: ServerNS;
    session: SessionNS;
    sync: SyncNS;
    constructor(server: Server);
}
export declare class AccountNS {
    _server: Server;
    constructor(server: Server);
    create(handler: ComAtprotoAccountCreate.Handler): void;
    createInviteCode(handler: ComAtprotoAccountCreateInviteCode.Handler): void;
    delete(handler: ComAtprotoAccountDelete.Handler): void;
    get(handler: ComAtprotoAccountGet.Handler): void;
    requestPasswordReset(handler: ComAtprotoAccountRequestPasswordReset.Handler): void;
    resetPassword(handler: ComAtprotoAccountResetPassword.Handler): void;
}
export declare class HandleNS {
    _server: Server;
    constructor(server: Server);
    resolve(handler: ComAtprotoHandleResolve.Handler): void;
}
export declare class RepoNS {
    _server: Server;
    constructor(server: Server);
    batchWrite(handler: ComAtprotoRepoBatchWrite.Handler): void;
    createRecord(handler: ComAtprotoRepoCreateRecord.Handler): void;
    deleteRecord(handler: ComAtprotoRepoDeleteRecord.Handler): void;
    describe(handler: ComAtprotoRepoDescribe.Handler): void;
    getRecord(handler: ComAtprotoRepoGetRecord.Handler): void;
    listRecords(handler: ComAtprotoRepoListRecords.Handler): void;
    putRecord(handler: ComAtprotoRepoPutRecord.Handler): void;
}
export declare class ServerNS {
    _server: Server;
    constructor(server: Server);
    getAccountsConfig(handler: ComAtprotoServerGetAccountsConfig.Handler): void;
}
export declare class SessionNS {
    _server: Server;
    constructor(server: Server);
    create(handler: ComAtprotoSessionCreate.Handler): void;
    delete(handler: ComAtprotoSessionDelete.Handler): void;
    get(handler: ComAtprotoSessionGet.Handler): void;
    refresh(handler: ComAtprotoSessionRefresh.Handler): void;
}
export declare class SyncNS {
    _server: Server;
    constructor(server: Server);
    getRepo(handler: ComAtprotoSyncGetRepo.Handler): void;
    getRoot(handler: ComAtprotoSyncGetRoot.Handler): void;
    updateRepo(handler: ComAtprotoSyncUpdateRepo.Handler): void;
}
export declare class AppNS {
    _server: Server;
    bsky: BskyNS;
    constructor(server: Server);
}
export declare class BskyNS {
    _server: Server;
    actor: ActorNS;
    feed: FeedNS;
    graph: GraphNS;
    notification: NotificationNS;
    system: SystemNS;
    constructor(server: Server);
}
export declare class ActorNS {
    _server: Server;
    constructor(server: Server);
    getProfile(handler: AppBskyActorGetProfile.Handler): void;
    search(handler: AppBskyActorSearch.Handler): void;
    searchTypeahead(handler: AppBskyActorSearchTypeahead.Handler): void;
    updateProfile(handler: AppBskyActorUpdateProfile.Handler): void;
}
export declare class FeedNS {
    _server: Server;
    constructor(server: Server);
    getAuthorFeed(handler: AppBskyFeedGetAuthorFeed.Handler): void;
    getLikedBy(handler: AppBskyFeedGetLikedBy.Handler): void;
    getPostThread(handler: AppBskyFeedGetPostThread.Handler): void;
    getRepostedBy(handler: AppBskyFeedGetRepostedBy.Handler): void;
    getTimeline(handler: AppBskyFeedGetTimeline.Handler): void;
}
export declare class GraphNS {
    _server: Server;
    constructor(server: Server);
    getFollowers(handler: AppBskyGraphGetFollowers.Handler): void;
    getFollows(handler: AppBskyGraphGetFollows.Handler): void;
}
export declare class NotificationNS {
    _server: Server;
    constructor(server: Server);
    getCount(handler: AppBskyNotificationGetCount.Handler): void;
    list(handler: AppBskyNotificationList.Handler): void;
    updateSeen(handler: AppBskyNotificationUpdateSeen.Handler): void;
}
export declare class SystemNS {
    _server: Server;
    constructor(server: Server);
}
