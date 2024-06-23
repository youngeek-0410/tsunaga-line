import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_160qkbz } from './api/v1/faces';
import type { Methods as Methods_6l8fl5 } from './api/v1/health';
import type { Methods as Methods_1epv1kw } from './api/v1/image-memories';
import type { Methods as Methods_1vz8qg3 } from './api/v1/login/access-token';
import type { Methods as Methods_1npfhci } from './api/v1/memories/_uuid@string';
import type { Methods as Methods_1t1bvw3 } from './api/v1/memories/_uuid@string/add-own-profile';
import type { Methods as Methods_iithbx } from './api/v1/memories/chronological';
import type { Methods as Methods_1amymro } from './api/v1/memories/public';
import type { Methods as Methods_fd5dg6 } from './api/v1/memories/random';
import type { Methods as Methods_1ddswdl } from './api/v1/profiles';
import type { Methods as Methods_t9szy8 } from './api/v1/profiles/_username@string';
import type { Methods as Methods_vcd09x } from './api/v1/profiles/_uuid@string';
import type { Methods as Methods_vq3bbv } from './api/v1/profiles/_uuid@string/icon';
import type { Methods as Methods_1pe5xqu } from './api/v1/profiles/_uuid@string/link';
import type { Methods as Methods_1q4njy0 } from './api/v1/profiles/me';
import type { Methods as Methods_vwd82r } from './api/v1/quest-achievement-memories';
import type { Methods as Methods_1l223z2 } from './api/v1/quest-requirements';
import type { Methods as Methods_9bzgy8 } from './api/v1/quest-requirements/mine';
import type { Methods as Methods_1ktycq7 } from './api/v1/quest-requirements/suggest';
import type { Methods as Methods_19bqmes } from './api/v1/quests';
import type { Methods as Methods_1m8x6ne } from './api/v1/quests/_uuid@string';
import type { Methods as Methods_r5qu0t } from './api/v1/users';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/api/v1/chat/rooms/';
  const PATH1 = '/messages/';
  const PATH2 = '/seen/';
  const PATH3 = '/api/v1/faces/';
  const PATH4 = '/api/v1/health/';
  const PATH5 = '/api/v1/image-memories/';
  const PATH6 = '/api/v1/login/access-token/';
  const PATH7 = '/api/v1/memories/';
  const PATH8 = '/';
  const PATH9 = '/add-own-profile/';
  const PATH10 = '/api/v1/memories/chronological/';
  const PATH11 = '/api/v1/memories/public/';
  const PATH12 = '/api/v1/memories/random/';
  const PATH13 = '/api/v1/profiles/';
  const PATH14 = '/icon/';
  const PATH15 = '/link/';
  const PATH16 = '/api/v1/profiles/me/';
  const PATH17 = '/api/v1/quest-achievement-memories/';
  const PATH18 = '/api/v1/quest-requirements/';
  const PATH19 = '/api/v1/quest-requirements/mine/';
  const PATH20 = '/api/v1/quest-requirements/suggest/';
  const PATH21 = '/api/v1/quests/';
  const PATH22 = '/api/v1/users/';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';
  const PATCH = 'PATCH';

  return {
    api: {
      v1: {
        faces: {
          /**
           * @returns Successful Response
           */
          post: (option: { body: Methods_160qkbz['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_160qkbz['post']['resBody'], BasicHeaders, Methods_160qkbz['post']['status']>(prefix, PATH3, POST, option, 'FormData').json(),
          /**
           * @returns Successful Response
           */
          $post: (option: { body: Methods_160qkbz['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_160qkbz['post']['resBody'], BasicHeaders, Methods_160qkbz['post']['status']>(prefix, PATH3, POST, option, 'FormData').json().then(r => r.body),
          $path: () => `${prefix}${PATH3}`,
        },
        health: {
          /**
           * @returns Successful Response
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_6l8fl5['get']['resBody'], BasicHeaders, Methods_6l8fl5['get']['status']>(prefix, PATH4, GET, option).json(),
          /**
           * @returns Successful Response
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_6l8fl5['get']['resBody'], BasicHeaders, Methods_6l8fl5['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH4}`,
        },
        image_memories: {
          /**
           * @returns Successful Response
           */
          post: (option: { body: Methods_1epv1kw['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1epv1kw['post']['resBody'], BasicHeaders, Methods_1epv1kw['post']['status']>(prefix, PATH5, POST, option, 'FormData').json(),
          /**
           * @returns Successful Response
           */
          $post: (option: { body: Methods_1epv1kw['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1epv1kw['post']['resBody'], BasicHeaders, Methods_1epv1kw['post']['status']>(prefix, PATH5, POST, option, 'FormData').json().then(r => r.body),
          $path: () => `${prefix}${PATH5}`,
        },
        login: {
          access_token: {
            /**
             * ユーザー名またはメールアドレスでログインしてアクセストークンを取得する
             * @returns Successful Response
             */
            post: (option: { body: Methods_1vz8qg3['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1vz8qg3['post']['resBody'], BasicHeaders, Methods_1vz8qg3['post']['status']>(prefix, PATH6, POST, option, 'URLSearchParams').json(),
            /**
             * ユーザー名またはメールアドレスでログインしてアクセストークンを取得する
             * @returns Successful Response
             */
            $post: (option: { body: Methods_1vz8qg3['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1vz8qg3['post']['resBody'], BasicHeaders, Methods_1vz8qg3['post']['status']>(prefix, PATH6, POST, option, 'URLSearchParams').json().then(r => r.body),
            $path: () => `${prefix}${PATH6}`,
          },
        },
        memories: {
          _uuid: (val3: string) => {
            const prefix3 = `${PATH7}${val3}`;

            return {
              add_own_profile: {
                post: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods_1t1bvw3['post']['status']>(prefix, `${prefix3}${PATH9}`, POST, option).send(),
                $post: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods_1t1bvw3['post']['status']>(prefix, `${prefix3}${PATH9}`, POST, option).send().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH9}`,
              },
              /**
               * @returns Successful Response
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1npfhci['get']['resBody'], BasicHeaders, Methods_1npfhci['get']['status']>(prefix, `${prefix3}${PATH8}`, GET, option).json(),
              /**
               * @returns Successful Response
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1npfhci['get']['resBody'], BasicHeaders, Methods_1npfhci['get']['status']>(prefix, `${prefix3}${PATH8}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}${PATH8}`,
            };
          },
          chronological: {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_iithbx['get']['resBody'], BasicHeaders, Methods_iithbx['get']['status']>(prefix, PATH10, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_iithbx['get']['resBody'], BasicHeaders, Methods_iithbx['get']['status']>(prefix, PATH10, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH10}`,
          },
          public: {
            /**
             * @returns Successful Response
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1amymro['get']['resBody'], BasicHeaders, Methods_1amymro['get']['status']>(prefix, PATH11, GET, option).json(),
            /**
             * @returns Successful Response
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1amymro['get']['resBody'], BasicHeaders, Methods_1amymro['get']['status']>(prefix, PATH11, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH11}`,
          },
          random: {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_fd5dg6['get']['resBody'], BasicHeaders, Methods_fd5dg6['get']['status']>(prefix, PATH12, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_fd5dg6['get']['resBody'], BasicHeaders, Methods_fd5dg6['get']['status']>(prefix, PATH12, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH12}`,
          },
        },
        profiles: {
          _username: (val3: string) => {
            const prefix3 = `${PATH13}${val3}`;

            return {
              /**
               * @returns Successful Response
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_t9szy8['get']['resBody'], BasicHeaders, Methods_t9szy8['get']['status']>(prefix, `${prefix3}${PATH8}`, GET, option).json(),
              /**
               * @returns Successful Response
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_t9szy8['get']['resBody'], BasicHeaders, Methods_t9szy8['get']['status']>(prefix, `${prefix3}${PATH8}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}${PATH8}`,
            };
          },
          _uuid: (val3: string) => {
            const prefix3 = `${PATH13}${val3}`;

            return {
              icon: {
                /**
                 * @returns Successful Response
                 */
                put: (option: { body: Methods_vq3bbv['put']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_vq3bbv['put']['resBody'], BasicHeaders, Methods_vq3bbv['put']['status']>(prefix, `${prefix3}${PATH14}`, PUT, option, 'FormData').json(),
                /**
                 * @returns Successful Response
                 */
                $put: (option: { body: Methods_vq3bbv['put']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_vq3bbv['put']['resBody'], BasicHeaders, Methods_vq3bbv['put']['status']>(prefix, `${prefix3}${PATH14}`, PUT, option, 'FormData').json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH14}`,
              },
              link: {
                patch: (option: { body: Methods_1pe5xqu['patch']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_1pe5xqu['patch']['resBody'], BasicHeaders, Methods_1pe5xqu['patch']['status']>(prefix, `${prefix3}${PATH15}`, PATCH, option).json(),
                $patch: (option: { body: Methods_1pe5xqu['patch']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_1pe5xqu['patch']['resBody'], BasicHeaders, Methods_1pe5xqu['patch']['status']>(prefix, `${prefix3}${PATH15}`, PATCH, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH15}`,
              },
              put: (option: { body: Methods_vcd09x['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_vcd09x['put']['resBody'], BasicHeaders, Methods_vcd09x['put']['status']>(prefix, `${prefix3}${PATH8}`, PUT, option).json(),
              $put: (option: { body: Methods_vcd09x['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_vcd09x['put']['resBody'], BasicHeaders, Methods_vcd09x['put']['status']>(prefix, `${prefix3}${PATH8}`, PUT, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}${PATH8}`,
            };
          },
          me: {
            /**
             * @returns Successful Response
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1q4njy0['get']['resBody'], BasicHeaders, Methods_1q4njy0['get']['status']>(prefix, PATH16, GET, option).json(),
            /**
             * @returns Successful Response
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1q4njy0['get']['resBody'], BasicHeaders, Methods_1q4njy0['get']['status']>(prefix, PATH16, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH16}`,
          },
          get: (option?: { query?: Methods_1ddswdl['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1ddswdl['get']['resBody'], BasicHeaders, Methods_1ddswdl['get']['status']>(prefix, PATH13, GET, option).json(),
          $get: (option?: { query?: Methods_1ddswdl['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1ddswdl['get']['resBody'], BasicHeaders, Methods_1ddswdl['get']['status']>(prefix, PATH13, GET, option).json().then(r => r.body),
          /**
           * @returns Successful Response
           */
          post: (option: { body: Methods_1ddswdl['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1ddswdl['post']['resBody'], BasicHeaders, Methods_1ddswdl['post']['status']>(prefix, PATH13, POST, option, 'FormData').json(),
          /**
           * @returns Successful Response
           */
          $post: (option: { body: Methods_1ddswdl['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1ddswdl['post']['resBody'], BasicHeaders, Methods_1ddswdl['post']['status']>(prefix, PATH13, POST, option, 'FormData').json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1ddswdl['get']['query'] } | undefined) =>
            `${prefix}${PATH13}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        quest_achievement_memories: {
          /**
           * @returns Successful Response
           */
          post: (option: { body: Methods_vwd82r['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_vwd82r['post']['resBody'], BasicHeaders, Methods_vwd82r['post']['status']>(prefix, PATH17, POST, option, 'FormData').json(),
          /**
           * @returns Successful Response
           */
          $post: (option: { body: Methods_vwd82r['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_vwd82r['post']['resBody'], BasicHeaders, Methods_vwd82r['post']['status']>(prefix, PATH17, POST, option, 'FormData').json().then(r => r.body),
          $path: () => `${prefix}${PATH17}`,
        },
        quest_requirements: {
          mine: {
            /**
             * @returns Successful Response
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_9bzgy8['get']['resBody'], BasicHeaders, Methods_9bzgy8['get']['status']>(prefix, PATH19, GET, option).json(),
            /**
             * @returns Successful Response
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_9bzgy8['get']['resBody'], BasicHeaders, Methods_9bzgy8['get']['status']>(prefix, PATH19, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH19}`,
          },
          suggest: {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1ktycq7['get']['resBody'], BasicHeaders, Methods_1ktycq7['get']['status']>(prefix, PATH20, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1ktycq7['get']['resBody'], BasicHeaders, Methods_1ktycq7['get']['status']>(prefix, PATH20, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH20}`,
          },
          post: (option: { body: Methods_1l223z2['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1l223z2['post']['resBody'], BasicHeaders, Methods_1l223z2['post']['status']>(prefix, PATH18, POST, option).json(),
          /**
           * @returns Successful Response
           */
          $post: (option: { body: Methods_1l223z2['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1l223z2['post']['resBody'], BasicHeaders, Methods_1l223z2['post']['status']>(prefix, PATH18, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH18}`,
        },
        quests: {
          _uuid: (val3: string) => {
            const prefix3 = `${PATH21}${val3}`;

            return {
              /**
               * @returns Successful Response
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1m8x6ne['get']['resBody'], BasicHeaders, Methods_1m8x6ne['get']['status']>(prefix, `${prefix3}${PATH8}`, GET, option).json(),
              /**
               * @returns Successful Response
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1m8x6ne['get']['resBody'], BasicHeaders, Methods_1m8x6ne['get']['status']>(prefix, `${prefix3}${PATH8}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}${PATH8}`,
            };
          },
          get: (option?: { query?: Methods_19bqmes['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_19bqmes['get']['resBody'], BasicHeaders, Methods_19bqmes['get']['status']>(prefix, PATH21, GET, option).json(),
          $get: (option?: { query?: Methods_19bqmes['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_19bqmes['get']['resBody'], BasicHeaders, Methods_19bqmes['get']['status']>(prefix, PATH21, GET, option).json().then(r => r.body),
          post: (option: { body: Methods_19bqmes['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_19bqmes['post']['resBody'], BasicHeaders, Methods_19bqmes['post']['status']>(prefix, PATH21, POST, option).json(),
          $post: (option: { body: Methods_19bqmes['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_19bqmes['post']['resBody'], BasicHeaders, Methods_19bqmes['post']['status']>(prefix, PATH21, POST, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_19bqmes['get']['query'] } | undefined) =>
            `${prefix}${PATH21}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        users: {
          /**
           * @returns Successful Response
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_r5qu0t['get']['resBody'], BasicHeaders, Methods_r5qu0t['get']['status']>(prefix, PATH22, GET, option).json(),
          /**
           * @returns Successful Response
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_r5qu0t['get']['resBody'], BasicHeaders, Methods_r5qu0t['get']['status']>(prefix, PATH22, GET, option).json().then(r => r.body),
          /**
           * @returns Successful Response
           */
          post: (option: { body: Methods_r5qu0t['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_r5qu0t['post']['resBody'], BasicHeaders, Methods_r5qu0t['post']['status']>(prefix, PATH22, POST, option).json(),
          /**
           * @returns Successful Response
           */
          $post: (option: { body: Methods_r5qu0t['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_r5qu0t['post']['resBody'], BasicHeaders, Methods_r5qu0t['post']['status']>(prefix, PATH22, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH22}`,
        },
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
