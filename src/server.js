const path = require('path');
require('dotenv').config();
const { Connection, Request, TYPES } = require('tedious');
const express = require('express');
const app = express();
const SQLSERVER = process.env.REACT_APP_SQLSERVER;
const SQLTYPE = process.env.REACT_APP_SQLTYPE;
const SQLUSER = process.env.REACT_APP_SQLUSER;
const SQLPASSWORD = process.env.REACT_APP_SQLPASSWORD;
const SQLPORT = parseInt(process.env.REACT_APP_SQLPORT);
const SQLDATABASE = process.env.REACT_APP_SQLDATABASE;
const REACT_APP_SERVERURL = process.env.REACT_APP_SERVERURL;
const PORT = parseInt(process.env.REACT_APP_PORT);

app.use(express.static(path.join(__dirname,"../build")));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", REACT_APP_SERVERURL);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const dbConfig = {
    server: SQLSERVER,
    authentication: {
        type: SQLTYPE,
        options: {
            userName: SQLUSER,
            password: SQLPASSWORD
        }
    },
    options: {
        port: SQLPORT,
        database: SQLDATABASE,
        trustServerCertificate: true
    }
};

app.get("/api/getnews/:uid/:bsn", (req, res) => {
    const getNextNewsByUserID = '[dbo].[getNextNewsByUserID]';
    let conn = new Connection(dbConfig);
    conn.on('connect', (err) => {
        if (err) {
            console.log(err);
        } else {
            let newsitem = null;
            let request = new Request(getNextNewsByUserID,
                (err, rowCount) => {
                    if (err) {
                        throw err;
                    }
                    if (newsitem !== null) {
                        res.json(JSON.parse(newsitem));
                    }
                    else {
                        res.json('');
                    }

                    console.log(`Item: ${req.params.uid} - ${req.params.bsn}`);
                }
            );

            request.addParameter('userID', TYPES.VarChar, req.params.uid);
            request.addParameter('SerialNumber', TYPES.Int, req.params.bsn);
            request.addOutputParameter('result', TYPES.VarChar);

            request.on('returnValue', (paramName, value, metadata) => {
                newsitem = value;
            });

            request.on('doneInProc', (rowCount, more) => {
                console.log(rowCount + ' rows returned');
            });

            conn.callProcedure(request);
        }
    });
    conn.connect();
});


app.get("/api/addlabel/:uid/:nid/:typ/:cat/:sen", (req, res) => {

    const setNewsItemProperties = '[dbo].[SetNewsItemProperties]';
    let conn = new Connection(dbConfig);

    conn.on('connect', (err) => {
        if (err) {
            console.log(err);
        } else {
            let newsId = null;
            let request = new Request(setNewsItemProperties,
                (err, rowCount) => {
                    if (err) {
                        throw err;
                    }
                    if (newsId !== null) {
                        res.json(JSON.parse(newsId));
                    }
                    else {
                        res.json('');
                    }
                    console.log(`Item: ${req.params.uid} - ${req.params.nid} - ${req.params.typ}:${req.params.cat}:${req.params.sen}`);
                }
            );

            request.addParameter('UserID', TYPES.VarChar, req.params.uid);
            request.addParameter('NewsID', TYPES.Int, req.params.nid);
            request.addParameter('Type', TYPES.Int, req.params.typ);
            request.addParameter('Category', TYPES.Int, req.params.cat);
            request.addParameter('Sentiment', TYPES.Int, req.params.sen);
            request.addOutputParameter('result', TYPES.VarChar);

            request.on('returnValue', (paramName, value, metadata) => {
                newsId = value;
            });

            request.on('doneInProc', (rowCount, more) => {
                console.log(rowCount + ' rows returned');
            });

            if (parseInt(req.params.typ) > 0 && parseInt(req.params.cat) > 0 && parseInt(req.params.sen) > 0) {
                conn.callProcedure(request);
            }
            else {
                res.json('');
            }
        }
    });
    conn.connect();
});

app.get("/api/auth/:uid/:pwd", (req, res) => {
    const authenticateUser = '[dbo].[AuthenticateUser]';
    let conn = new Connection(dbConfig);
    conn.on('connect', (err) => {
        if (err) {
            console.log(err);
        } else {
            let userId = null;
            let request = new Request(authenticateUser,
                (err, rowCount) => {
                    if (err) {
                        throw err;
                    }
                    if (userId !== null) {
                        res.json(JSON.parse(userId));
                    }
                    else {
                        res.json('');
                    }
                    console.log(`Auth --> ${req.params.uid}`);
                }
            );
            request.addParameter('userID', TYPES.VarChar, req.params.uid);
            request.addParameter('pwd', TYPES.VarChar, req.params.pwd);
            request.addOutputParameter('result', TYPES.VarChar);

            request.on('returnValue', (paramName, value, metadata) => {
                userId = value;
            });

            request.on('doneInProc', (rowCount, more) => {
                console.log(rowCount + ' rows returned');
            });
            conn.callProcedure(request);
        }
    });
    conn.connect();
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
