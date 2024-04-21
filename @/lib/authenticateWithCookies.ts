import { User } from '@supabase/supabase-js';
import { supabaseClient } from './supabase';

interface Request {
      headers: Headers;
}


export async function authenticateWithCookies(request: Request): Promise<User | null> {
      const authCookie = request.headers.get("cookie");

      if (!authCookie) {
            console.log('No auth cookie found. Proceeding without authentication.');
            return null; // No auth cookie found, so return null user
      }

      const cookies: { [key: string]: string } = authCookie.split(';').reduce((cookies, cookie) => {
            const [name, value] = cookie.trim().split('=');
            console.log({ name, value });
            cookies[name] = value;
            return cookies;
      }, {});

      const refresh_token = cookies['sb-refresh-token'];
      const access_token = cookies['sb-access-token'];

      if (!refresh_token || !access_token) {
            console.log('Refresh token or access token not found in cookies. Proceeding without authentication.');
            return null; // Missing tokens, so return null user
      }

      const { data: { user }, error } = await supabaseClient.auth.setSession({
            access_token,
            refresh_token
      });

      if (error) {
            console.error('Error setting session:', error.message);
      }

      return user;
}
