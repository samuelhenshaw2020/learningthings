export interface post_str{
    current_page: number,
    data: post_model[],
    first_page_url: string,
    from: number,
    last_page: number, 
    last_page_url: string,
    next_page_url: string| null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number
}


export interface post_model{
    category: string,
    created_at?: string,
    featured_image: string | any,
    post_body: string,
    post_id: number,
    post_title: string,
    site_id: string,
    updated_at?: string
}

export interface post_data{
    data: post_model[]
}