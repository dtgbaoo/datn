"use client";

import { useState, useEffect } from "react";
import {
  ref,
  onValue,
  off,
  push,
  set,
  remove,
  update,
} from "firebase/database";
import { database } from "@/lib/firebase";

export const useDatabase = <T>(path: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dataRef = ref(database, path);

    const handleData = (snapshot: any) => {
      try {
        const value = snapshot.val();
        setData(value);
        setError(null);
      } catch (err) {
        setError("Lỗi khi đọc dữ liệu");
        console.error("Error reading data:", err);
      } finally {
        setLoading(false);
      }
    };

    onValue(dataRef, handleData, (error) => {
      setError("Lỗi khi kết nối database");
      console.error("Database error:", error);
      setLoading(false);
    });

    return () => {
      off(dataRef);
    };
  }, [path]);

  const addData = async (newData: any) => {
    try {
      const dataRef = ref(database, path);
      const newRef = push(dataRef);
      await set(newRef, newData);
      return newRef.key;
    } catch (err) {
      console.error("Error adding data:", err);
      throw err;
    }
  };

  const updateData = async (key: string, newData: any) => {
    try {
      const dataRef = ref(database, `${path}/${key}`);
      await update(dataRef, newData);
    } catch (err) {
      console.error("Error updating data:", err);
      throw err;
    }
  };

  const updateRootData = async (newData: any) => {
    try {
      const dataRef = ref(database, path);
      await update(dataRef, newData);
    } catch (err) {
      console.error("Error updating root data:", err);
      throw err;
    }
  };

  const deleteData = async (key: string) => {
    try {
      const dataRef = ref(database, `${path}/${key}`);
      await remove(dataRef);
    } catch (err) {
      console.error("Error deleting data:", err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    addData,
    updateData,
    updateRootData,
    deleteData,
  };
};
