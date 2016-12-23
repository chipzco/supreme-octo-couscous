"use strict";
var sortFnClass = (function () {
    function sortFnClass(fieldNames, sortTypes, currSort, currdir) {
        this.currSort = currSort;
        this.currdir = currdir;
        var fieldNameArr = fieldNames.split(',');
        var sortTypeArr = sortTypes.split(',');
        if (fieldNameArr.length == sortTypeArr.length) {
            this._sortCols = fieldNameArr.map(function (el, i) {
                return { column: el, sortType: sortTypeArr[i] };
            });
        }
    }
    Object.defineProperty(sortFnClass.prototype, "sortCols", {
        get: function () { return this._sortCols; },
        enumerable: true,
        configurable: true
    });
    sortFnClass.prototype.sort = function (dataset, index, reverse) {
        var _this = this;
        if (index === void 0) { index = this.currSort; }
        if (reverse === void 0) { reverse = this.currdir; }
        var arrCopy = dataset.slice(); //immutable 
        if (index < this._sortCols.length && index != null && reverse != null) {
            var fieldname_1 = this._sortCols[index].column;
            var fieldsort_1 = this._sortCols[index].sortType;
            if (fieldname_1 && fieldsort_1)
                arrCopy.sort(function (a, b) { return _this.sortfn(a, b, fieldname_1, fieldsort_1, reverse); });
            //set the current sort and dir	
            this.currSort = index;
            this.currdir = reverse;
        }
        return arrCopy;
    };
    sortFnClass.prototype.flipSort = function () {
        return !this.currdir;
    };
    sortFnClass.prototype.sortfn = function (a, b, fieldname, fieldsort, reverse) {
        var fieldvalue_a = a[fieldname];
        var fieldvalue_b = b[fieldname];
        if (fieldvalue_a == null || fieldvalue_b == null)
            return 0;
        switch (fieldsort) {
            case 'CHAR':
                if (reverse)
                    return fieldvalue_b.localeCompare(fieldvalue_a); //+(fieldvalue_b > fieldvalue_a) || +(fieldvalue_a === fieldvalue_b) - 1;															
                return fieldvalue_a.localeCompare(fieldvalue_b); //+(fieldvalue_a > fieldvalue_b) || +(fieldvalue_a === fieldvalue_b) - 1;															
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
    };
    return sortFnClass;
}());
exports.sortFnClass = sortFnClass;
var sortClass = (function () {
    function sortClass() {
    }
    return sortClass;
}());
exports.sortClass = sortClass;
//# sourceMappingURL=sort-fn.class.js.map