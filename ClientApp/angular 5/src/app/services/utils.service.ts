import { Injectable } from '@angular/core';
import {ConfigService} from "../modules/config";

@Injectable()
export class UtilsService {

  constructor(private confScv:ConfigService) { }

  console = (type, val, message) => {
    if (this.confScv.getConfig().opts.showLogs) {
      switch (val) {
        case true :
          switch (type) {
            case `i` :
              console.info(message);
              break;
            case `l` :
              console.log(message);
              break;
            case `w`:
              console.warn(message);
              break;
            case `e`:
              console.error(message);
              break;
            default :
              console.log(message);
          }
          break;
        case false:
          break;
      }
    }
  };
}
