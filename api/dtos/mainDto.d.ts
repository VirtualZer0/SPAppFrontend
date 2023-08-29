declare namespace MainDto {
  // ..\spapp-backend\Core\Dtos\AuthByDiscordDto.cs
  export interface AuthByDiscordDto {
    code: string;
  }

  // ..\spapp-backend\Core\Dtos\CommentDto.cs
  export interface CommentDto {
    id: uint;
    user: UserInfoDto;
    text: string;
    createdAt: string;
  }

  // ..\spapp-backend\Core\Dtos\CreateCommentDto.cs
  export interface CreateCommentDto {
    text: string;
  }

  // ..\spapp-backend\Core\Dtos\CreatePaymentDto.cs
  export interface CreatePaymentDto {
    accountId: uint;
    amount: uint;
    redirectTo: string;
  }

  // ..\spapp-backend\Core\Dtos\FileInfoDto.cs
  export interface FileInfoDto {
    id: string;
    userId: uint;
    name: string;
  }

  // ..\spapp-backend\Core\Dtos\ForbiddenActionDto.cs
  export interface ForbiddenActionDto {
    action: ForbiddenUserAction;
    forbiddenUntil: string;
    reason: string;
  }

  // ..\spapp-backend\Core\Dtos\InitialDto.cs
  export interface InitialDto {
    discordClientId: string;
    discordRedirectUri: string;
  }

  // ..\spapp-backend\Core\Dtos\ItemList.cs
  export interface ItemList<T> {
    items: T[];
    count: number;
  }

  // ..\spapp-backend\Core\Dtos\MojangUserDataDto.cs
  export interface MojangUserDataDto {
    id: string;
    name: string;
  }

  // ..\spapp-backend\Core\Dtos\OAuthTokenDto.cs
  export interface OAuthTokenDto {
    accessToken: string;
    tokenType: string;
    expiresIn: ulong;
    refreshToken: string;
    scope: string;
  }

  // ..\spapp-backend\Core\Dtos\PaymentDto.cs
  export interface PaymentDto {
    id: string;
    amount: uint;
    payUrl: string;
    expirationDate: string;
    createdAt: string;
    destinationId: uint;
    user: UserInfoDto;
    payer: string;
    status: PaymentStatus;
  }

  // ..\spapp-backend\Core\Dtos\ResponseErrorDto.cs
  export interface ResponseErrorDto {
    code: number;
    error: number;
    detail?: any;
  }

  // ..\spapp-backend\Core\Dtos\TokenDto.cs
  export interface TokenDto {
    token: string;
    expires: uint;
  }

  // ..\spapp-backend\Core\Dtos\UserAccountDto.cs
  export interface UserAccountDto {
    id: uint;
    balance: number;
    isDefault: boolean;
    mcs: MCServer;
  }

  // ..\spapp-backend\Core\Dtos\UserInfoDto.cs
  export interface UserInfoDto {
    id: ulong;
    userName: string;
    minecraftUuid: string;
  }

  // ..\spapp-backend\Core\Dtos\UserProfileDto.cs
  export interface UserProfileDto {
    id: ulong;
    userName: string;
    discordName: string;
    discordId: string;
    minecraftUuid: string;
    roles: string[];
    latestActivity?: string;
    createdAt?: string;
    accounts: Record<uint, UserAccountDto>;
  }

  // ..\spapp-backend\Core\Dtos\WithdrawMoneyDto.cs
  export interface WithdrawMoneyDto {
    accountId: uint;
    amount: uint;
    card: string;
    comment: string;
  }

  // ..\spapp-backend\Core\Dtos\SP\SPBalanceDto.cs
  export interface SPBalanceDto {
    balance: uint;
  }

  // ..\spapp-backend\Core\Dtos\SP\SPCreateTransactionDto.cs
  export interface SPCreateTransactionDto {
    receiver: string;
    amount: uint;
    comment: string;
  }

  // ..\spapp-backend\Core\Dtos\SP\SPPaymentDataDto.cs
  export interface SPPaymentDataDto {
    amount: uint;
    redirectUrl: string;
    webhookUrl: string;
    data: string;
  }

  // ..\spapp-backend\Core\Dtos\SP\SPPaymentResponse.cs
  export interface SPPaymentResponse {
    payer: string;
    amount: uint;
    data: string;
  }

  // ..\spapp-backend\Core\Dtos\SP\SPPaymentUrlDto.cs
  export interface SPPaymentUrlDto {
    url: string;
    hash: string;
  }

  // ..\spapp-backend\Core\Dtos\SP\SPUserDto.cs
  export interface SPUserDto {
    username: string;
  }
}
