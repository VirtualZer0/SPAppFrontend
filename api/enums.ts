// ..\spapp-backend\Core\Enums\ForbiddenUserAction.cs
export enum ForbiddenUserAction {
  ALL = 1,
  UPLOAD_FILES = 1,
  CREATE_COMMENTS = 2,
  CREATE_CROWDFUNDINGS = 3,
  CREATE_PAYMENTS = 4,
  CREATE_TRANSACTIONS = 5,
  BUY_ITEMS = 6,
  CREATE_SHOP = 7
}

// ..\spapp-backend\Core\Enums\MCServer.cs
export enum MCServer {
  SP = 1,
  SPM = 2
}

// ..\spapp-backend\Core\Enums\PaymentStatus.cs
export enum PaymentStatus {
  Awaiting = 0,
  Paid = 1,
  Canceled = 2,
  Expired = 3
}

// ..\spapp-backend\Core\Enums\ResponseError.cs
export enum ResponseError {
  Unknown = 0,
  ServerNotAvailable = 1,
  Forbidden = 2,
  AuthMethod = 3,
  UserNotFound = 4,
  BadCaptcha = 5,
  AuthDiscord = 6,
  FileTooLarge = 7,
  UserCreating = 8,
  SPUserNotFound = 9,
  MojangUserNotFound = 10,
  WrongFilesCount = 11,
  WrongFileFormat = 12,
  TooManyFilesInShortTime = 13,
  PaymentNotFound = 14,
  WrongPaymentHash = 15,
  ValidationFailed = 16,
  AccountNotFound = 17,
  InsufficientFunds = 18,
  SPApiError = 19,
  TooManyUnprocessedPayments = 20,
  CrowdCompanyNotFound = 21,
  TooManyComments = 22,
  ForbiddenAction = 23,
  CantSupportYourOwnCompany = 24
}

// ..\spapp-backend\Core\Enums\Role.cs
export interface AuthRoles {}

// ..\spapp-backend\Core\Enums\Role.cs
export enum Role {
  Superadmin = 1,
  Admin = 2,
  User = 3,
  WorkerSupport = 4,
  WorkerDelivery = 5
}

// ..\spapp-backend\Core\Enums\TransactionFailReason.cs
export enum TransactionFailReason {
  InsufficientFunds = 0,
  SPApiError = 1,
  Unknown = 2
}

// ..\spapp-backend\Core\Enums\TransactionType.cs
export enum TransactionType {
  Internal = 1,
  Input = 2,
  Output = 3
}
