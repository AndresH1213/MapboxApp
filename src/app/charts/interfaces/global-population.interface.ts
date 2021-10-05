export interface GlobalPopulation {
    ok:   boolean;
    body: Body;
}

export interface Body {
    world_population: number;
    total_countries:  number;
}