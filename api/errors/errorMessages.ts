import { ResponseError } from '~/api/enums';

export const errorMessages: Record<ResponseError, string[]> = {
  [ResponseError.AccountNotFound]: ['Счет не найден', 'Указанный счет или кошелек отсутствует на выбранном сервере'],
  [ResponseError.AuthDiscord]: ['Ошибка авторизации', 'Возникла проблема при получении данных от Discord'],
  [ResponseError.AuthMethod]: ['Ошибка авторизации', 'Выбранный метод авторизации недоступен для этого пользователя'],
  [ResponseError.BadCaptcha]: ['Ошибка запроса', 'Вы не прошли или пропустили проверку капчи'],
  [ResponseError.CantSupportYourOwnCompany]: ['Действие запрещено', 'Вы не можете поддержать собственный сбор'],
  [ResponseError.CrowdCompanyNotFound]: ['Сбор не найден', 'Запрошенный вами сбор не найден'],
  [ResponseError.FileTooLarge]: ['Ошибка загрузки', 'Загружаемый вами файл слишком большой'],
  [ResponseError.Forbidden]: ['Доступ запрещен', 'У вас недостаточно прав для просмотра этого содержимого'],
  [ResponseError.ForbiddenAction]: ['Действие заблокирвоано', 'На ваш аккаунт наложен запрет данного действия'],
  [ResponseError.InsufficientFunds]: ['Недостаточно средств', 'На вашем счете недостаточно средств для выполнения этого действия'],
  [ResponseError.MojangUserNotFound]: ['Пользователь не найден', 'Не удалось найти связанный с этим профилем аккаунт Mojang'],
  [ResponseError.PaymentNotFound]: ['Платеж не найден', 'Информация о платеже недоступна'],
  [ResponseError.SPApiError]: ['Ошибка SPWorlds', 'Возможно, сервера SPWorlds сейчас перегружены, повторите попытку через пару минут'],
  [ResponseError.SPUserNotFound]: ['Пользователь не найден', 'Указанный пользователь не найден на сайте SPWorlds'],
  [ResponseError.ServerNotAvailable]: ['Ошибка сервера', 'Сервер временно недоступен, повторите попытку позже'],
  [ResponseError.TooManyComments]: ['Слишком часто', 'Вы оставляете слишком много комментариев за короткое время'],
  [ResponseError.TooManyFilesInShortTime]: [
    'Ошибка загрузки',
    'Вы загрузили слишком много файлов за короткий период времени, повторите попытку через 15 минут'
  ],
  [ResponseError.TooManyUnprocessedPayments]: [
    'Ошибка создания платежа',
    'У вас слишком много неоплаченных платежей. Завершите их, или повторите попытку позже'
  ],
  [ResponseError.Unknown]: ['Неизвестная ошибка', 'Выбранное вами действие невозможно выполнить'],
  [ResponseError.UserCreating]: ['Ошибка регистрации', 'Возникла проблема при вашей регистрации в SP App. Обратитесь в поддержку.'],
  [ResponseError.UserNotFound]: ['Пользователь не найден', 'Текущий пользователь не найден. Попробуйте авторизоваться заново.'],
  [ResponseError.ValidationFailed]: ['Ошибка заполнения полей', 'Пожалуйста, проверьте введенные вами данные на правильность'],
  [ResponseError.WrongFileFormat]: ['Ошибка загрузки', 'Выбранный формат файла запрещен для загрузки'],
  [ResponseError.WrongFilesCount]: ['Ошибка загрузки', 'Вы загружаете слишком много файлов за один раз'],
  [ResponseError.WrongPaymentHash]: ['Ошибка подтверждения платежа', 'Хэши платежа не совпадают']
};
