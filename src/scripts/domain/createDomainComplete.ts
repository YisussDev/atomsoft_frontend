import {CreateEntity} from "./entity/createEntity";
import {CreateRepository} from "./repository/createRepository";
import {DirectionsModule} from "../directions";

function constructorDomain() {

  const params: string[] = process.argv;

  const directions: any = DirectionsModule;

  CreateEntity.constructEntity(directions.domain.entity.src, directions.domain.entity.example);
  CreateRepository.constructRepository(directions.domain.repository.src, directions.domain.repository.example);

}


constructorDomain();
