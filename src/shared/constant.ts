type TRole = {
  SystemAdmin: string,
  Account: string
}

export const ROLES: TRole = {
  SystemAdmin: 'SystemAdmin',
  Account: 'Account'
}

type TAccess = {
  ArticleStore: string,
  ArticleAdminUpdate: string,
  ArticleOwnerUpdate: string
}

export const ACCESSES: TAccess = {
  ArticleStore: 'ArticleStore',
  ArticleAdminUpdate: 'ArticleAdminUpdate',
  ArticleOwnerUpdate: 'ArticleOwnerUpdate'
}
