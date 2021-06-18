## JWT - ?
JWT - строка формата Заголовок.Тело.Сигнатура
Заголовое обязательно содержит информацию об алгоритме шифрования и типе токена.

Тело содержит информацию о пользователе (id, name, roles). Тело может расшифровать абсолютно любой человек.

Для проверки истинности токена используется сигнатура и секретный ключ, который известен только серверу. Без секретного ключа сигнатуру получить невозможно.

## Типы токенов
ACCESS - токен доступа. (время жизни лучше ставить 15-30 минут, чтобы сократить время, когда злоумышленник может совершить какие-то действия)
REFRESH - токен, который перезаписывает ACCESS. (время жизни лучше ставить месяц. Если пользователь не будет заходить месяц, то ему придется заново ввести логин и пароль). 
ACCESS легче хранить в localstorage, а REFRESH в httpOnly cookie, чтобы их нельля было изменить при помощи JS скрипта.

