import axios from "axios";
import React from "react";

export const BASEURL = "http://localhost:8000";

export const request = (method, url, data = null, auth = true, long = false) =>
  axios.request({
    url: url,
    method: method,
    baseURL: BASEURL,
    data: data,
    ...(long ? {} : { timeout: 10000 }),
    ...(auth
      ? {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      : {}),
  });

export const getMe = () =>
  request("get", `/me`, null);

export const getCategories = () =>
  request("get", `/categories`, null);

export const getTasks = (categoryID) =>
  request("get", `/session/${categoryID}/get_type`);
