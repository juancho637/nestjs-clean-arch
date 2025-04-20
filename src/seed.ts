async function bootstrap() {
  const env = process.env.APP_ENV;

  if (env === 'dev') {
    const { runDevSeeders } = await import('./seeders/dev.seeders');

    await runDevSeeders();
  } else if (env === 'prod') {
    const { runProdSeeders } = await import('./seeders/prod.seeders');

    await runProdSeeders();
  } else {
    console.warn('⚠️ APP_ENV no definido correctamente. Usa dev o prod.');
  }

  process.exit(0);
}

bootstrap().catch((err) => console.error(err));
