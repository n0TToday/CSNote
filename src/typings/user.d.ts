/** 用户相关模块 */
declare namespace Auth {
  /**
   * 用户角色类型
   * - admin: 管理员
   * - user: 用户
   */
  type RoleType = keyof typeof import('@/enum').EnumUserRole;

  /** 用户信息 */
  interface UserInfo {
    /** 用户id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户角色类型 */
    userRole: RoleType;
  }
}
type UserInfo = Auth.UserInfo;
