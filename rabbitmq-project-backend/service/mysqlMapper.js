
const select = (options = {}) => {
    try {
        let sql = "";
        let columns = "";
        let from = "";
        let joins = "";
        let conditions = "";
        let count = "";
        let groupBy = "";
        let orderBy = "";
        let limit = "";

        let select = "SELECT ";
        // console.log('INSIDE MAPPER',options.joins);


        if (options.columns) {
            columns = " " + options.columns;
        } else if(options.count) {
            count = ` COUNT(${options.count}) `;
        }
        else {
            columns = " *";
        }
        if (options.from) {
            from = " FROM " + options.from;
        }
        if (options.joins) {
            options.joins.forEach(join => {
                joins += " " + join.type + " JOIN " + join.table + " ON " + join.on;
            });
        }
        if (options.conditions) {
            conditions = " WHERE " + options.conditions;
        } else {
            conditions = " WHERE 1 = 1 ";
        }
        // console.log('step-1');
      
        if (options.groupBy) {
            groupBy += " GROUP BY (" + options.groupBy.by + ") ";
        }
        if (options.orderBy) {
            orderBy += " ORDER BY";
            if (options.orderBy[0]) {
                let delim = " ";
                options.orderBy.forEach(o => {
                    orderBy += delim + o.by + " " + o.order;
                    delim = ", ";
                })
            } else {
                let o = options.orderBy;
                orderBy += " " + o.by + " " + o.order;
            }
        }
        if (options.limit) {
            if (options.limit.limit && options.limit.limit > 0) {
                // let start = 0;
                if (options.limit.start) {
                    start = options.limit.start;
                }

                limit = " LIMIT " + options.limit.limit + " " + "OFFSET" + " " + options.limit.start;
            }
        }
        
        sql += select + count + columns.trimEnd() + from + joins + conditions + groupBy + orderBy + limit;

        console.log('---QUERY ---', sql);
        return sql;

        
    } catch (error) {
        console.log(error)
        return error;
    }
}

// Insert query builder function
const insert = (options = {}) => {
    try {

        let sql = "INSERT INTO " + options.table + " (" + options.columns + ") VALUES " + "( " + options.values + ")" ;
        // sql="INSERT INTO employee (employee_email, employee_name, designation, password) VALUES ( 'aseem.mangla@truminds.com' ,'Aseem Mangla','Intern','aseem')";
        console.log('QUERY', sql);
        return sql
    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = {select, insert}
