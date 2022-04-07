import axios from "axios";

export const getUsers = async (page, size) => {
  try {
    const { data } = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${size}&delay=1`
    );

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
