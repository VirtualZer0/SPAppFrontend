declare namespace AdminDto {
  // ..\spapp-backend\Modules\Admin\Dtos\EditPaymentDto.cs
  export interface EditPaymentDto {
    status?: PaymentStatus;
    expirationDate?: string;
  }

  // ..\spapp-backend\Modules\Admin\Dtos\MainStatDto.cs
  export interface MainStatDto {
    allUserCount: number;
    newUserLastWeekCount: number;
    newUserTodayCount: number;
    monthActiveUserCount: number;
    weekActiveUserCount: number;
    dayActiveUserCount: number;
    paymentCount: number;
    paymentLastWeekCount: number;
    paymentTodayCount: number;
    paymentTodayFailedCount: number;
    spCardBalance?: number;
    spmCardBalance?: number;
  }
}
