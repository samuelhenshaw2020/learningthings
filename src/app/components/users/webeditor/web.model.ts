export interface identity_model {
//    site_data: {
    about: {
        enabled: boolean,
        about: string
    },
    business_name: string,
    color: string,
    contact: {
        address: string,
        email: string,
        enabled: boolean,
        phone: string
    },
    description: string,
    gallery: {
        enabled: boolean,
        gallery: Object[]
    },
    header_image: string,
    header_title: string,
    link: string,
    logo: string,
    mission?: {
        mission: string,
        enabled: boolean
    },
    portfolio: {
        description: string,
        image: string,
        profile: string,
        skills: Object[]

    },
    service: {
        enabled: boolean,
        services: object[]
    },
    short: string,
    id: number,
    social_media?: {
        enabled: boolean,
        handles: Object[]
    },
    template_id: number,
    user_id: number,
    vission: {
        enabled: boolean,
        vission: string

    }


//    }
}


export interface social_model {
    enabled: boolean,
    link: string

}

export interface about{
    enabled: boolean,
    about: any
}

export interface mission{
    enabled: boolean,
    mission: any
}

export interface vission{
    enabled: boolean,
    vission: any
}
