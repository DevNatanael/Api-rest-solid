import { HttpRequest, HttpResponse, IController } from "../../Users/protocols";
import { CreateImageParams, ICreateImage } from "./protocols";

export class ImageController implements IController {
  constructor(private readonly createImage: ICreateImage) {}

  async handle(
    httpRequest: HttpRequest<CreateImageParams | any>
  ): Promise<HttpResponse<unknown>> {
    try {

      const image = await this.createImage.create(httpRequest.body);

      return {
        statusCode: 200,
        body: image,
      };
    } catch (error) {
      console.log("deu ruim: ", error);
      return {
        statusCode: 500,
        body: "Algo deu errado",
      };
    }
  }
}
