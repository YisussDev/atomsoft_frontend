import {DirectionsModule} from "../directions";
import {CreateModule} from "./module/createModule";
import {CreateUseCase} from "./use-case/createUseCase";

function createApplicationComplete() {

  const directions: any = DirectionsModule;

  CreateModule.constructModule(directions.application.module.src, directions.application.module.example);

  CreateUseCase.constructModule(directions.application.use_case.src, directions.application.use_case.example);

}


createApplicationComplete();
