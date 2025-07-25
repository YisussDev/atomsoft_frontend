import {CreateEntity} from './domain/entity/createEntity';
import {CreateRepository} from './domain/repository/createRepository';
import {CreateImplementation} from './infrastructure/http/implementation/createImplementation';
// import {CreateMapper} from './mapper/createMapper';
import {CreateModel} from './infrastructure/http/models/createModel';
import {CreateUseCase} from "./application/use-case/createUseCase";
import {CreateModule} from "./application/module/createModule";
import {DirectionsModule} from "./directions";

function constructorModules() {

  const params: string[] = process.argv;

  const directions: any = DirectionsModule;

  CreateEntity.constructEntity(directions.entity.src, directions.entity.example);
  CreateRepository.constructRepository(directions.repository.src, directions.repository.example);
  CreateImplementation.constructImplementation(directions.implementation.src, directions.implementation.example);
  // CreateMapper.constructMapper(directions.mappers.src, directions.mappers.example);
  CreateModel.constructModel(directions.models.src, directions.models.example);
  CreateUseCase.constructUseCase(directions.use_case.src, directions.use_case.example);
  CreateModule.constructModule(directions.module.src, directions.module.example);

}


constructorModules();
