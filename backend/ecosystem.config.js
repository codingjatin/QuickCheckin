module.exports = {
  apps: [{
    name: 'quickcheck-backend',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 5172
    },
    // Graceful shutdown
    kill_timeout: 5000,
    listen_timeout: 10000,
    // Logging
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: '/var/log/quickcheck/error.log',
    out_file: '/var/log/quickcheck/out.log',
    merge_logs: true,
    // Health check
    min_uptime: '10s',
    max_restarts: 10
  }]
};
