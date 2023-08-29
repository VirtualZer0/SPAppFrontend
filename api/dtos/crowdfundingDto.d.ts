declare namespace CrowdfundingDto {
  // ..\spapp-backend\Modules\Crowdfunding\Dtos\CreateCrowdfundCompanyDto.cs
  export interface CreateCrowdfundCompanyDto {
    images: string[];
    preview?: string;
    goal: number;
    title: string;
    content: string;
    shortDescription: string;
    endDate: string;
  }

  // ..\spapp-backend\Modules\Crowdfunding\Dtos\CrowdfundCompanyItemDto.cs
  export interface CrowdfundCompanyItemDto {
    id: uint;
    user: UserInfoDto;
    images: string[];
    preview?: string;
    goal: number;
    currentAmount: number;
    title: string;
    content: string;
    shortDescription: string;
    endDate: string;
    isOver: boolean;
    commentCount: number;
    updatedAt: string;
  }

  // ..\spapp-backend\Modules\Crowdfunding\Dtos\EditCrowdfundCompanyDto.cs
  export interface EditCrowdfundCompanyDto {
    images?: Guid[];
    preview?: string;
    goal?: number;
    title?: string;
    content?: string;
    shortDescription?: string;
    endDate?: string;
  }

  // ..\spapp-backend\Modules\Crowdfunding\Dtos\SupportCrowdfundCompanyDto.cs
  export interface SupportCrowdfundCompanyDto {
    amount: uint;
  }
}
