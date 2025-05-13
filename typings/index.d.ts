/// <reference path="./types/index.d.ts" />

interface IAppOption {
	globalData : {
		userInfo ?: WechatMiniprogram.UserInfo,
	}
	userInfoReadyCallback ?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

// 创建收藏集返回值
export interface AddCollectionRes {
	id : string;
	name ?: string;
	createTime ?: number;
	count ?: number;
	status ?: number;
	desc ?: string;
	articleIds ?: string[];
}

// 文章列表返回数据
export interface ArticleItem extends AddCollectionRes {
	abstract ?: string;
	authorId ?: string;
	authorName ?: string;
	classify ?: string;
	content ?: string;
	headUrl ?: string;
	coverImage ?: string;
	createTime ?: number;
	id : string;
	isLike ?: boolean;
	likeCount ?: number;
	replyCount ?: number;
	readCount ?: number;
	tag ?: string;
	title ?: string;
	_title ?: string;
	commentCount ?: number;
	isDelete ?: boolean;
	collectCount ?: number;
	toUserId ?: string;
	action ?: string;
	fromUsername ?: string;
	fromUserId ?: string;
	isReaded ?: boolean;
	pushDate ?: number;
	articleId ?: number;
	isTop ?: number;
	gradient ?: number[][];
	language ?: string;
}

// 代码集
export interface CodeItem {
	id : string;
	userId : string;
	content : string;
	title : string;
	abstract : string;
	createTime : number;
	language : string;
	codeType : string;
	difficulty : string;
}