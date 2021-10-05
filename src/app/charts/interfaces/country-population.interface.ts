export interface CountryPopulation {
    ok:   boolean;
    body: Body;
}

export interface Body {
    country_name: string;
    population:   number;
    ranking:      number;
    world_share:  number;
}
