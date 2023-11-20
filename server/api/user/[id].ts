import users from '@/public/user.json';

export default defineEventHandler(event => {
    const id:string | undefined = getRouterParam(event, 'id');
    return users.find(user => user.id === parseInt(id || '0') || {});
});
