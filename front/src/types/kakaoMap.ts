/** 카카오 장소 검색 타입 */

type Meta = {
    is_end: boolean, 
    pageable_count: number, 
    total_count: number
    same_name: {
        keyword: string, 
        region: string[], 
        selected_region:  string;
    }, 
}

type AddressInfo = {
    address_name: string,
    category_group_code: string,
    category_group_name: string,
    category_name: string,
    distance: string,
    id: string,
    phone: string,
    place_name: string,
    place_url: string,
    road_address_name: string,
    x: string, 
    y: string
}

type AddressResponse = {
    meta: Meta;
    documents: AddressInfo[];
}

export type {Meta, AddressInfo, AddressResponse}