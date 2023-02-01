import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_PUBLIC_KEY
);



export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const push = useNavigate();
  const signup = async (payload: any) => {
    setLoading(true);
    const { error: e1 } = await supabase.from("users").insert([
      {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
      },
    ]);

    if (e1) {
      console.log(e1);
      setLoading(false);
      return;
    }
    const { error: e2 } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });
    if (e2) {
      console.log(e2);
      setLoading(false);
      return;
    }
    push("/login");
    setLoading(false);
  };
  return { loading, signup };
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const push = useNavigate();
  const login = async (payload: any) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(payload);
    if (error) {
      console.log(error);
        setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      push("/home");
    }
  };
  return { loading, login, error };
};


export const useGetMe = () => {
  
    const push = useNavigate();
    const [loading, setLoading] = useState(false);
    const getMe = async () => {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!session) {
            setLoading(false);
            push("/login");
            return;
        }
        setLoading(false);
    }


    useEffect(() => {
        getMe();
    }, []);
    return { loading };
}
// const { error } = await supabase.auth.signOut()
