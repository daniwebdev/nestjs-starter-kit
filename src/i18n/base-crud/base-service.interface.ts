export interface IBaseService<CreateDTO, UpdateDTO> {
    create(data: CreateDTO): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, data:UpdateDTO ): any;
    remove(id: number): any;
}