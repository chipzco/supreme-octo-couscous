import { Injectable, Inject } from '@angular/core';
import { WindowExtend, JQMinSpec } from './window-extend';
declare let window: WindowExtend;		
@Injectable()
export class window_cover {  
  get g_window_ref(): WindowExtend {	
	return window;
  }		
}

