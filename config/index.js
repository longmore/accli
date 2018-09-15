
module.exports = {
    message: '请选择初始化类型',
    itemName: '创建{{ value }}服务',
    choices: [
        {
            value: 'nodejs',
            children: {
                message: '请选择nodejs类型',
                itemName: '创建{{ value }}类型',
                choices: [
                    {
                        value: 'egg-bigpipe-boilerplate',
                        repo: 'git@git.corp.kuaishou.com:acfun-frontend/egg-bigpipe-boilerplate.git'
                    },
                    {
                        value: 'egg-vue-ssr',
                        repo: 'git@git.corp.kuaishou.com:acfun-frontend/egg-bigpipe-boilerplate.git'
                    }
                ]
            }
        },
        {
            value: 'static',
            children: {
                message: '请选择static类型',
                choices: [
                    {
                        value: 'egg-bigpipe-boilerplate'
                    },
                    {
                        value: 'egg-vue-ssr'
                    }
                ]
            }
        }
    ]
};