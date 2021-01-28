
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

from sqlalchemy import create_engine, func
import os
import pandas as pd

from flask import Flask, render_template, request, redirect, session
from datetime import datetime
import csv
import json
import random
import sqlite3

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about")
def about():
    
    return render_template("about.html")


@app.route("/data", methods=["GET", "POST"])
def get_data():
    credentials = "sqlite:///fifa_dataset.db"

    dataframe = pd.read_sql("""SELECT * FROM fifa_data""", con=credentials)
    dataframe = dataframe.to_json(orient = "index", force_ascii=False)
    data_set = []
    for i in dataframe:
        data_set.append(i)
    data = {
        "data": data_set
    }

    return dataframe


@app.route("/map")
def stats():

    ##### TEST ######

    ##### TEST ######

    # assign a variable that contains a string of your credentials
    credentials = "sqlite:///fifa_dataset.db"
    # read in your SQL query results using pandas
    dataframe = pd.read_sql("""SELECT * FROM fifa_data
            """, con=credentials)
    # return your first five rows
    # print(dataframe.head())

    return render_template('map.html',  tables=[dataframe.to_html(classes='data', index=False)], titles=dataframe.columns.values)

@app.route("/charts")
def charts():

    credentials = "sqlite:///kim_dataset.db"

    dataframe = pd.read_sql("""SELECT * FROM kim_data""", con=credentials)
    dataframe = dataframe.to_json(orient = "records", force_ascii=False)
    data_set = []
    for i in dataframe:
        data_set.append(i)
    data = {
        "data": data_set
    }

    return dataframe

@app.route("/greg")
def gerg_func():
    return render_template("greg.html")


@app.route("/kim")
def kim_func():
    return render_template("kim.html")


@app.route("/jessica")
def jess_func():
    return render_template("jessica.html")

@app.route("/grant")
def grant_func():
    return render_template("grant.html")

@app.route("/cory")
def cory_func():
    return render_template("cory.html")

if __name__ == '__main__':
    app.run(debug=True)