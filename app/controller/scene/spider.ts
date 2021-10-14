import axios from "axios";
import { Controller } from "egg";
import { bp } from "egg-blueprint";
bp.prefix("/scene/spider", "SceneController");
export default class SceneController extends Controller {
  @bp.post("/")
  public async index() {
    const { ctx } = this;
    const params = ctx.request.body;
    if (!params.url) {
      return ctx.fail("缺少参数url");
    }
    const res = await axios.get<ResType>(params.url);
    if (res.data.code == 200) {
      const data = await this.saveScene(res.data.data.pdata, params);
      ctx.success(data);
    } else {
      ctx.fail(res.data);
    }
  }

  private async saveScene(pdata, params) {
    // const params = this.ctx.request.body;
    const scene = {
      title: params.title,
      desc: "",
      cover: params.cover,
      music: pdata.music.url,
      properties: "",
      creator: 2,
    };
    this.app.Sequelize;
    const data = await this.app.model.Scene.create(scene);
    await this.saveScenePage(pdata, data.id);
    return data;
  }
  private getAnimations(elementAnimations) {
    const result: Array<AnimateType> = [];
    if (elementAnimations.animation_in.enable) {
      result.push({
        animateName: elementAnimations.animation_in.show,
        label: elementAnimations.animation_in.show,
        delay: elementAnimations.animation_in.delay / 1000, //动画延迟时间
        duration: elementAnimations.animation_in.speed / 1000, //动画完成时间
      });
    }
    elementAnimations.animation_on
      .filter((a) => a.enable)
      .map((a) => {
        result.push({
          animateName: a.show,
          label: a.show,
          delay: a.delay / 1000,
          duration: a.speed / 1000,
          iterationCount: a.iteration_count,
          infinite: a.enable_loop,
        });
      });
    return result;
  }
  private async saveScenePage(pdata, sceneId) {
    this.ctx.helper;
    const typeMap = {
      pic: "image",
      ptext: "text",
    };
    const scale = 375 / pdata.spec.width;

    const pages = pdata.json.map((item, i) => {
      const elements = item.content.map((a) => {
        const ele: EleType = {
          id: this.ctx.helper.randomString(6),
          type: typeMap[a.type],
          style: {
            top: a.top * scale,
            left: a.left * scale,
            width: a.w * scale,
            height: a.h * scale,
            opacity: a.opacity,
            lineHeight: a.lineHeight * (a.ftsize > 0 ? a.ftsize * scale : 20),
            color: a.ftcolor,
            fontSize: a.ftsize * scale,
            textAlign: a.textalign,
            letterSpacing: a.letterSpacing,
            textdecoration: a.textdecoration,
          },
          animateList: this.getAnimations(a.elementAnimations),
          attrs: {},
        };
        switch (a.type) {
          case "pic":
            if (a.cropData) {
              ele.style.backgroundImage =
                "url(" + "https://img1.maka.im/" + a.picid + ")";
              ele.style.backgroundSize =
                ele.style.width / (a.cropData.width / a.orgWidth) +
                "px " +
                ele.style.height / (a.cropData.height / a.orgHeight) +
                "px";
              ele.style.backgroundPosition =
                -a.cropData.left * (ele.style.width / a.orgWidth) +
                "px " +
                -a.cropData.top * (ele.style.width / a.orgWidth) +
                "px";
            } else {
              ele.attrs.src = "https://img1.maka.im/" + a.picid;
            }
            break;
          case "ptext":
            ele.text = a.con;
            break;
          default:
            delete ele.attrs.src;
        }
        return ele;
      });
      const page = {
        name: "页面" + (i + 1),
        sortIndex: i + 1,
        cover: "",
        properties: "",
        elements: JSON.stringify(elements),
        elementsPublish: JSON.stringify(elements),
        sceneId: sceneId,
      };
      return page;
    });
    console.log("保存的pages================================", pages);
    await this.app.model.ScenePage.bulkCreate(pages);
    return sceneId;
  }
}
interface ResType {
  code: number;
  data: {
    pdata: any;
  };
}
interface EleType {
  id: string;
  type: string;
  text?: string;
  style: {
    [key: string]: number | string;
    top: number;
    left: number;
    width: number;
    height: number;
  };
  animateList: Array<AnimateType>;
  attrs: {
    src?: string;
  };
}
interface AnimateType {
  animateName: string;
  label: string;
  id?: string;
  delay?: number; //动画延迟时间
  duration?: number; //动画完成时间
  iterationCount?: number; //动画播放次数
  infinite?: boolean; //循环
}
