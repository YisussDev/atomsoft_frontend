import {DirectionsModule} from "../../directions";
import {CreateRepository} from "./repository/createRepository";
import {CreateModel} from "./models/createModel";
import {CreateMapper} from "./mapper/createMapper";

function createInfrastructureHttpComplete() {

  const params: string[] = process.argv;

  const directions: any = DirectionsModule;

  CreateRepository.constructRepository(directions.infrastructure_http.repository.src, directions.infrastructure_http.repository.example);

  CreateModel.constructModel(directions.infrastructure_http.models.src, directions.infrastructure_http.models.example);

  CreateMapper.constructMapper(directions.infrastructure_http.mappers.src, directions.infrastructure_http.mappers.example);

}


createInfrastructureHttpComplete();
