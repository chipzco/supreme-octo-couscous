import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';


@Directive({ selector: '[cdRepeat]' })

export class RepeaterDirective   {

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef  ) {  }		
	@Input('cdRepeat') set myRepeater(rows: number)   {
		this.viewContainer.clear();       			
		for (let r=0; r < rows; r++)	 
			this.viewContainer.createEmbeddedView(this.templateRef);        	
	}		    	
}