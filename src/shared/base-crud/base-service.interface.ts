export interface IBaseService {
    create(data: any): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, data:any ): any;
    remove(id: number): any;
}