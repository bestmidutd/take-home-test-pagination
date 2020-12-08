var mysql = require('mysql')

var pool  = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    user: "root",
    password: "q1w2e3r4",
    database: "chad",
    multipleStatements: true
  })

renderForm = (req, res) =>{
    const limit = 2
    const page = req.query.page
    const sortby = req.query.sortby
    const offset = (page - 1) * limit
    var sql = "select proj.project_title, user.username, cate.categoryname from ilance_users user join ilance_projects proj on user.user_id=proj.user_id left join categories cate on proj.cid=cate.cid"
    switch (sortby) {
      case " ":
        break;
      case "Recent Projects":
        sql = "select proj.project_title, user.username, cate.categoryname from ilance_users user join ilance_projects proj on user.user_id=proj.user_id left join categories cate on proj.cid=cate.cid limit "+limit+" OFFSET "+offset
        break;
      case "Order By Category Name ASC" :
        sql = "select proj.project_title, user.username, cate.categoryname from ilance_users user join ilance_projects proj on user.user_id=proj.user_id left join categories cate on proj.cid=cate.cid ORDER BY cate.categoryname limit "+limit+" OFFSET "+offset
        break;
      case "Order By Username Asc":
        sql = "select proj.project_title, user.username, cate.categoryname from ilance_users user join ilance_projects proj on user.user_id=proj.user_id left join categories cate on proj.cid=cate.cid ORDER BY user.username DESC limit "+limit+" OFFSET "+offset
        break;
      case "Order By Project Title Asc":
        sql = "select proj.project_title, user.username, cate.categoryname from ilance_users user join ilance_projects proj on user.user_id=proj.user_id left join categories cate on proj.cid=cate.cid ORDER BY proj.project_title ASC limit "+limit+" OFFSET "+offset
    }
    pool.getConnection( (err, conn) => {
        conn.query(sql, (error, results, fields) => {
            conn.release()
            if(error) throw error
            var jsonRes = {
                'products_page_count':results.length,
                'page_number':page,
                'products':results
            }
            var resString = JSON.parse(JSON.stringify(jsonRes))
            res.json(resString)
            res.end()
        })
    })

}
module.exports = {renderForm}