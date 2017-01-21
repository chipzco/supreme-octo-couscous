export class sortFn {
    private _sortCols: sortClass[];
    private _fieldname: string;
    private _fieldsort: string;


    constructor(fieldNames: string, sortTypes: string, public currSort: number, public currdir: boolean) {
        let fieldNameArr: string[] = fieldNames.split(',');
        let sortTypeArr: string[] = sortTypes.split(',');
        if (fieldNameArr.length == sortTypeArr.length) {
            this._sortCols = fieldNameArr.map(function (el, i) {
                return { column: el, sortType: sortTypeArr[i] };
            });
        }
    }
    get sortCols(): sortClass[] { return this._sortCols; }

    public sort<T>(dataset: T[], index: number = this.currSort, reverse: boolean = this.currdir): T[] {
        let arrCopy: T[] = dataset.slice(); //immutable 
        if (index < this._sortCols.length && index != null && reverse != null) {
            let fieldname: string = this._sortCols[index].column;
            let fieldsort: string = this._sortCols[index].sortType;
            if (fieldname && fieldsort)
                arrCopy.sort((a, b) => this.sortfn(a, b, fieldname, fieldsort, reverse));

            //set the current sort and dir	
            this.currSort = index;
            this.currdir = reverse;
        }
        return arrCopy;
    }
    public flipSort(): boolean {
        return !this.currdir;
    }
    protected sortfn(a: any, b: any, fieldname: string, fieldsort: string, reverse: boolean): number {
        let fieldvalue_a = a[fieldname];
        let fieldvalue_b = b[fieldname];
        if (fieldvalue_a == null || fieldvalue_b == null)
            return 0;
        switch (fieldsort) {
            case 'CHAR':
                if (reverse)
                    return fieldvalue_b.localeCompare(fieldvalue_a); //+(fieldvalue_b > fieldvalue_a) || +(fieldvalue_a === fieldvalue_b) - 1;															
                return fieldvalue_a.localeCompare(fieldvalue_b);  //+(fieldvalue_a > fieldvalue_b) || +(fieldvalue_a === fieldvalue_b) - 1;															
            case 'NUM':
                if (reverse)
                    return fieldvalue_b - fieldvalue_a;
                return fieldvalue_a - fieldvalue_b;
            case 'DATE':
                if (reverse)
                    return fieldvalue_b - fieldvalue_a;
                return fieldvalue_a - fieldvalue_b;
            default:
                console.log("Wrong sort.........");
        }
        return 0;
    }
}

export class sortClass {
    column: string;
    sortType: string
}
