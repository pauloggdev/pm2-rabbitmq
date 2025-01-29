export default interface Connection{
    query(sql:string, params:any[]|string|null):Promise<any>;
    connect():Promise<any>;
    end():Promise<any>;
}