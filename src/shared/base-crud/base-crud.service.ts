import { Repository } from "typeorm";
import { IBaseService } from "./base-service.interface";
import { InjectRepository } from "@nestjs/typeorm";

export abstract class BaseCrudService<A,B> implements IBaseService {
    constructor(  
      public roleRepository: Repository<any>
    ) {}
  
    get repo() { return this.roleRepository; } 
  
    create(createRoleDto: A|any) {
      const newRole = this.repo.create(createRoleDto);
      return this.repo.save(newRole);
    }
  
    findAll() {
      return this.repo.find();
    }
  
    findOne(id: number) {
      return this.repo.findOne({where: {
        id,
      }});
    }
  
    update(id: number, updateRoleDto: B | any ) {
      return this.repo.update(id, updateRoleDto);
    }
  
    remove(id: number) {
      return this.repo.delete(id);
    }
  }
  