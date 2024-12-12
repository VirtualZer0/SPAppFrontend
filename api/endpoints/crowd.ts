import useFetchApi from '~/api/useFetchApi';

export const crowd = {
  getCompanies: async (
    from = 0,
    count = 15,
    sort:
      | 'dateAsc'
      | 'dateDesc'
      | 'amountAsc'
      | 'amountDesc'
      | 'default' = 'default',
    filter: 'over' | 'cancelled' | 'active' | 'all' = 'all',
    user: undefined | null | number = undefined,
    strip = true
  ) => {
    return useFetchApi<
      MainDto.ItemList<CrowdfundingDto.CrowdfundCompanyItemDto>
    >('/crowd/companies/all', {
      query: {
        from,
        count,
        sort,
        filter,
        user,
        strip,
      },
    });
  },

  createCompany: async (body: CrowdfundingDto.CreateCrowdfundCompanyDto) => {
    return useFetchApi<CrowdfundingDto.CrowdfundCompanyItemDto>(
      '/crowd/companies/create',
      {
        method: 'POST',
        body,
      }
    );
  },

  editCompany: async (
    id: number,
    body: CrowdfundingDto.EditCrowdfundCompanyDto
  ) => {
    if (!body.preview) {
      delete body.preview;
    }
    return useFetchApi(`/crowd/companies/${id}`, {
      method: 'PUT',
      body,
    });
  },

  getCompany: async (id: Number) => {
    return useFetchApi<CrowdfundingDto.CrowdfundCompanyItemDto>(
      `crowd/companies/${id}`
    );
  },

  getComments: async (
    company: number,
    from = 0,
    count = 50,
    sort: 'dateAsc' | 'dateDesc' = 'dateAsc'
  ) => {
    return useFetchApi<MainDto.ItemList<MainDto.CommentDto>>(
      `/crowd/companies/${company}/comments`,
      {
        query: {
          from,
          count,
          sort,
        },
      }
    );
  },

  createComment: async (company: number, body: MainDto.CreateCommentDto) => {
    return useFetchApi<MainDto.CommentDto>(
      `/crowd/companies/${company}/comments/create`,
      {
        method: 'POST',
        body,
      }
    );
  },

  supportCompany: async (
    company: number,
    body: CrowdfundingDto.SupportCrowdfundCompanyDto
  ) => {
    return useFetchApi(`/crowd/companies/${company}/support`, {
      method: 'POST',
      body,
    });
  },

  cancelCompany: async (company: number) => {
    return useFetchApi(`/crowd/companies/${company}/cancel`, {
      method: 'POST',
    });
  },

  acceptCompany: async (company: number) => {
    return useFetchApi(`/crowd/companies/${company}/accept`, {
      method: 'POST',
    });
  },
};
