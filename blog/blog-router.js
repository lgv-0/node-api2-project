const express = require("express");

const DBControl = require("../data/db.js");

const router = express.Router();

router.get("/", (req, res)=>
{
    res.status(200).json({"hi":"there"});
});

router.get("/posts/:id?", (req, res)=>
{
    let ID = req.params.id;

    if (ID === undefined)
        DBControl.find().then((response)=>
        {
            res.status(200).json(response);
        }).catch((error)=>
        {
            res.status(500).json({"error":"Internal connection error"});
        });
    else
    {
        if (isNaN(req.params.id))
        {
            res.status(400).json({"error":"Invalid request paramaters"});
            return;
        }

        DBControl.findById(ID).then((response)=>
        {
            if (response.length !== 0)
                res.status(200).json(response);
            else
                res.status(404).json({"error":"Post not found"});
        }).catch((error)=>
        {
            res.status(500).json({"error":"Internal connection error"});
        })
    }
});

router.get("/posts/:id/comments", (req, res)=>
{
    if (isNaN(req.params.id))
    {
        res.status(400).json({"error":"Invalid request paramaters"});
        return;
    }

    DBControl.findPostComments(req.params.id).then((response)=>
    {
        res.status(200).json(response);
    }).catch((error)=>
    {
        res.status(500).json({"error":"Internal connection error"});
    });
});

module.exports = router;