import { chapter, e, ex, lesson, n, s, v } from './helpers';
import { CurriculumChapter } from './types';

export const GRADE_6_CHAPTERS_6_TO_9: CurriculumChapter[] = [
  chapter(6, 6, 'Fractions', 'Phân số', [
    lesson(
      6, 6, 23,
      'Expanding Fractions and Equivalent Fractions',
      'Mở rộng phân số. Phân số bằng nhau',
      ['Extend fractions to negative integers and state the cross-product condition.', 'Apply the fundamental property of fractions to simplify fractions.'],
      ['Mở rộng khái niệm phân số với tử và mẫu là số nguyên.', 'Nêu điều kiện hai phân số bằng nhau và rút gọn phân số.'],
      [
        v('g6l23-v1', 'numerator / denominator', 'n', 'tử số / mẫu số', 'In $\\frac{a}{b}$ ($b \\ne 0$), $a$ is the numerator and $b$ is the denominator.', 'Trong $\\frac{a}{b}$ ($b \\ne 0$), $a$ là tử số và $b$ là mẫu số.', 'A negative denominator can be moved to the numerator by multiplying by $-1$.', 'Có thể chuyển dấu trừ từ mẫu lên tử bằng cách nhân cả tử và mẫu với $-1$.'),
        v('g6l23-v2', 'equivalent fractions', 'n phr', 'phân số bằng nhau', 'Fractions $\\frac{a}{b}$ and $\\frac{c}{d}$ satisfying $a \\cdot d = b \\cdot c$.', 'Hai phân số $\\frac{a}{b}$ và $\\frac{c}{d}$ thỏa mãn $a \\cdot d = b \\cdot c$.', '$\\frac{-3}{4}$ and $\\frac{6}{-8}$ are equivalent fractions.', '$\\frac{-3}{4}$ và $\\frac{6}{-8}$ là hai phân số bằng nhau.'),
        v('g6l23-v3', 'irreducible fraction / simplest form', 'n phr', 'phân số tối giản', 'A fraction whose numerator and denominator have $\\gcd(|a|, |b|) = 1$.', 'Phân số mà $\\text{ƯCLN}(|a|, |b|) = 1$.', 'Reduce $\\frac{-12}{18}$ to simplest form $\\frac{-2}{3}$.', 'Rút gọn $\\frac{-12}{18}$ về phân số tối giản $\\frac{-2}{3}$.'),
      ],
      [
        n('g6l23-n1', '\\frac{a}{b} = \\frac{c}{d} \\Leftrightarrow a \\cdot d = b \\cdot c', 'a over b equals c over d if and only if a times d equals b times c', 'a phần b bằng c phần d khi và chỉ khi a nhân d bằng b nhân c'),
      ],
      [
        e('g6l23-e1', 'describe', 'Multiplying or dividing both numerator and denominator by the same nonzero integer yields an equivalent fraction.', 'Nhân hoặc chia cả tử và mẫu với cùng một số nguyên khác $0$ cho ta phân số bằng phân số đã cho.'),
        e('g6l23-e2', 'question', 'What value of $x$ makes $\\frac{x}{6} = \\frac{-5}{3}$?', 'Giá trị nào của $x$ thỏa mãn $\\frac{x}{6} = \\frac{-5}{3}$?'),
        e('g6l23-e3', 'present', 'By cross-multiplication, $3x = 6 \\cdot (-5) = -30$, so $x = -10$.', 'Nhân chéo ta có $3x = 6 \\cdot (-5) = -30$, suy ra $x = -10$.'),
      ],
      [
        ex(
          'g6l23-ex1',
          'Simplifying negative fractions',
          'Rút gọn phân số chứa số âm',
          'Write $\\frac{18}{-24}$ with a positive denominator and in simplest form.',
          'Viết phân số $\\frac{18}{-24}$ với mẫu dương và ở dạng tối giản.',
          [
            s('Step 1: Move minus sign to numerator', 'Bước 1: Đưa dấu âm lên tử', '$\\frac{18}{-24} = \\frac{-18}{24}$.', '$\\frac{18}{-24} = \\frac{-18}{24}$.'),
            s('Step 2: Divide by $\\gcd(18, 24) = 6$', 'Bước 2: Chia cả tử và mẫu cho $6$', '$\\frac{-18 : 6}{24 : 6} = \\frac{-3}{4}$.', '$\\frac{-18 : 6}{24 : 6} = \\frac{-3}{4}$.'),
          ],
          'The simplest form is $\\frac{-3}{4}$.',
          'Phân số tối giản là $\\frac{-3}{4}$.'
        ),
      ],
      ['Khi đọc phân số chứa số âm hoặc chữ, dùng cấu trúc "... over ..." (ví dụ: `negative three over four`).']
    ),
    lesson(
      6, 6, 24,
      'Comparing Fractions and Positive Mixed Numbers',
      'So sánh phân số. Hỗn số dương',
      ['Compare fractions by converting to positive common denominators.', 'Convert between improper fractions and mixed numbers.'],
      ['So sánh hai phân số bằng cách đưa về mẫu dương chung.', 'Đổi qua lại giữa phân số lớn hơn $1$ và hỗn số dương.'],
      [
        v('g6l24-v1', 'common denominator', 'n phr', 'mẫu chung', 'A shared positive multiple used to rewrite two fractions before comparing or adding.', 'Mẫu số dương chung dùng để quy đồng trước khi so sánh hoặc cộng trừ.', 'With a common denominator of $12$, compare the numerators.', 'Sau khi quy đồng mẫu chung $12$, ta so sánh hai tử số.'),
        v('g6l24-v2', 'mixed number', 'n phr', 'hỗn số', 'A positive number written as a whole-number part plus a proper fraction, such as $2\\frac{3}{4}$.', 'Số gồm phần nguyên và phần phân số nhỏ hơn $1$, như $2\\frac{3}{4}$.', 'Read $2\\frac{3}{4}$ as "two and three fourths".', '$2\\frac{3}{4}$ đọc là "hai, ba phần tư".'),
      ],
      [
        n('g6l24-n1', '2\\frac{3}{4} = \\frac{2 \\cdot 4 + 3}{4} = \\frac{11}{4}', 'two and three fourths equals eleven over four', 'hỗn số hai ba phần tư bằng 11 phần 4'),
      ],
      [
        e('g6l24-e1', 'describe', 'Always make denominators positive before comparing numerators.', 'Luôn viết các phân số dưới dạng mẫu dương trước khi so sánh tử số.'),
        e('g6l24-e2', 'question', 'Which fraction is larger: $\\frac{-5}{6}$ or $\\frac{-7}{8}$?', 'Phân số nào lớn hơn: $\\frac{-5}{6}$ hay $\\frac{-7}{8}$?'),
        e('g6l24-e3', 'present', 'Rewriting with denominator $24$: $\\frac{-20}{24} > \\frac{-21}{24}$, hence $\\frac{-5}{6} > \\frac{-7}{8}$.', 'Quy đồng mẫu chung $24$: $\\frac{-20}{24} > \\frac{-21}{24}$, suy ra $\\frac{-5}{6} > \\frac{-7}{8}$.'),
      ],
      [
        ex(
          'g6l24-ex1',
          'Converting between improper fraction and mixed number',
          'Đổi phân số và hỗn số',
          'Write $\\frac{17}{5}$ as a mixed number and compare it with $3\\frac{1}{2}$.',
          'Viết $\\frac{17}{5}$ dưới dạng hỗn số và so sánh với $3\\frac{1}{2}$.',
          [
            s('Step 1: Divide $17$ by $5$', 'Bước 1: Chia $17$ cho $5$', '$17 : 5 = 3$ remainder $2$, so $\\frac{17}{5} = 3\\frac{2}{5}$.', '$17 : 5 = 3$ dư $2$, nên $\\frac{17}{5} = 3\\frac{2}{5}$.'),
            s('Step 2: Compare fractional parts', 'Bước 2: So sánh phần phân số', 'Both have whole part $3$; since $\\frac{2}{5} = \\frac{4}{10} < \\frac{5}{10} = \\frac{1}{2}$, we get $3\\frac{2}{5} < 3\\frac{1}{2}$.', 'Cùng phần nguyên $3$; vì $\\frac{4}{10} < \\frac{5}{10}$ nên $3\\frac{2}{5} < 3\\frac{1}{2}$.'),
          ],
          '$\\frac{17}{5} = 3\\frac{2}{5} < 3\\frac{1}{2}$.',
          '$\\frac{17}{5} = 3\\frac{2}{5} < 3\\frac{1}{2}$.'
        ),
      ],
      ['Đọc hỗn số có từ `and` nối phần nguyên và phần phân số: $3\\frac{2}{5}$ đọc "three and two fifths".']
    ),
    lesson(
      6, 6, 25,
      'Addition and Subtraction of Fractions',
      'Phép cộng và phép trừ phân số',
      ['Add and subtract fractions with like and unlike denominators.', 'Identify the additive inverse (opposite) of a fraction and apply properties.'],
      ['Cộng trừ hai phân số cùng mẫu và khác mẫu.', 'Xác định số đối của phân số và vận dụng tính chất phép cộng.'],
      [
        v('g6l25-v1', 'opposite of a fraction', 'n phr', 'số đối của phân số', 'The fraction $-\\frac{a}{b}$ whose sum with $\\frac{a}{b}$ equals $0$.', 'Phân số $-\\frac{a}{b}$ có tổng với $\\frac{a}{b}$ bằng $0$.', 'The opposite of $\\frac{-2}{5}$ is $\\frac{2}{5}$.', 'Số đối của $\\frac{-2}{5}$ là $\\frac{2}{5}$.'),
        v('g6l25-v2', 'unlike denominators', 'n phr', 'khác mẫu số', 'Fractions with different denominators that require a common denominator before adding.', 'Các phân số có mẫu khác nhau, cần quy đồng trước khi cộng trừ.', 'Find the least common denominator of $\\frac{1}{4}$ and $\\frac{1}{6}$.', 'Tìm mẫu chung nhỏ nhất của $\\frac{1}{4}$ và $\\frac{1}{6}$.'),
      ],
      [
        n('g6l25-n1', '-\\frac{a}{b} = \\frac{-a}{b} = \\frac{a}{-b}', 'negative a over b equals negative a all over b equals a over negative b', 'âm a phần b bằng trừ a phần b bằng a phần trừ b'),
      ],
      [
        e('g6l25-e1', 'describe', 'Never add denominators together when adding two fractions.', 'Không bao giờ được cộng hai mẫu số lại với nhau khi cộng phân số.'),
        e('g6l25-e2', 'question', 'Which pairs of fractions in this sum have the same denominator so we can group them?', 'Những cặp phân số nào cùng mẫu để ta nhóm lại tính nhanh?'),
        e('g6l25-e3', 'present', 'Grouping fractions with denominator $7$ yields $\\left(\\frac{-3}{7} + \\frac{-4}{7}\\right) = -1$.', 'Nhóm các phân số cùng mẫu $7$ cho ta $\\left(\\frac{-3}{7} + \\frac{-4}{7}\\right) = -1$.'),
      ],
      [
        ex(
          'g6l25-ex1',
          'Adding and subtracting fractions',
          'Cộng trừ phân số hợp lí',
          'Calculate $\\frac{-3}{4} + \\frac{5}{6} - \\frac{1}{4}$.',
          'Tính $\\frac{-3}{4} + \\frac{5}{6} - \\frac{1}{4}$.',
          [
            s('Step 1: Group like denominators', 'Bước 1: Nhóm các phân số cùng mẫu $4$', '$\\left(\\frac{-3}{4} - \\frac{1}{4}\\right) + \\frac{5}{6} = -1 + \\frac{5}{6}$.', '$\\left(\\frac{-3}{4} - \\frac{1}{4}\\right) + \\frac{5}{6} = -1 + \\frac{5}{6}$.'),
            s('Step 2: Finish addition', 'Bước 2: Cộng tiếp kết quả', '$\\frac{-6}{6} + \\frac{5}{6} = \\frac{-1}{6}$.', '$\\frac{-6}{6} + \\frac{5}{6} = \\frac{-1}{6}$.'),
          ],
          'The value is $-\\frac{1}{6}$.',
          'Kết quả là $-\\frac{1}{6}$.'
        ),
      ],
      ['Nhắc học sinh đặt dấu trừ ngang vạch phân số hoặc trên tử số.']
    ),
    lesson(
      6, 6, 26,
      'Multiplication and Division of Fractions',
      'Phép nhân và phép chia phân số',
      ['Multiply fractions across numerators and denominators and cancel common factors early.', 'Find reciprocals and divide fractions by multiplying by the reciprocal.'],
      ['Nhân hai phân số và rút gọn chéo trước khi nhân.', 'Tìm phân số nghịch đảo và thực hiện phép chia phân số.'],
      [
        v('g6l26-v1', 'reciprocal / multiplicative inverse', 'n phr', 'phân số nghịch đảo', 'The reciprocal of $\\frac{a}{b}$ ($a, b \\ne 0$) is $\\frac{b}{a}$, since their product is $1$.', 'Số nghịch đảo của $\\frac{a}{b}$ ($a, b \\ne 0$) là $\\frac{b}{a}$ vì tích của chúng bằng $1$.', 'The reciprocal of $\\frac{-3}{5}$ is $\\frac{-5}{3}$.', 'Phân số nghịch đảo của $\\frac{-3}{5}$ là $\\frac{-5}{3}$.'),
        v('g6l26-v2', 'multiply by the reciprocal', 'v phr', 'nhân với phân số nghịch đảo', 'Rule for fraction division: $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$.', 'Quy tắc chia phân số: giữ nguyên số bị chia và nhân với nghịch đảo số chia.', 'Keep the first fraction, change to multiplication, and flip the second.', 'Giữ nguyên phân số đầu, chuyển sang phép nhân và nghịch đảo phân số thứ hai.'),
      ],
      [
        n('g6l26-n1', '\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}', 'a over b times c over d equals a times c over b times d', 'a phần b nhân c phần d bằng tử nhân tử, mẫu nhân mẫu'),
      ],
      [
        e('g6l26-e1', 'describe', 'Zero has no reciprocal because division by zero is undefined.', 'Số $0$ không có số nghịch đảo vì không thể chia cho $0$.'),
        e('g6l26-e2', 'question', 'What is the reciprocal of $-\\frac{2}{7}$?', 'Số nghịch đảo của $-\\frac{2}{7}$ là bao nhiêu?'),
        e('g6l26-e3', 'present', 'Multiplying by the reciprocal of the divisor gives $\\frac{3}{4} : \\frac{-9}{8} = \\frac{3}{4} \\cdot \\frac{-8}{9} = -\\frac{2}{3}$.', 'Nhân với phân số nghịch đảo ta có $\\frac{3}{4} : \\frac{-9}{8} = \\frac{3}{4} \\cdot \\frac{-8}{9} = -\\frac{2}{3}$.'),
      ],
      [
        ex(
          'g6l26-ex1',
          'Using distributive property with fractions',
          'Tính nhanh phép nhân phân số',
          'Calculate $P = \\frac{5}{7} \\cdot \\frac{2}{11} + \\frac{5}{7} \\cdot \\frac{9}{11} - \\frac{5}{7}$.',
          'Tính $P = \\frac{5}{7} \\cdot \\frac{2}{11} + \\frac{5}{7} \\cdot \\frac{9}{11} - \\frac{5}{7}$.',
          [
            s('Step 1: Factor out $\\frac{5}{7}$', 'Bước 1: Đặt thừa số chung $\\frac{5}{7}$', '$P = \\frac{5}{7} \\cdot \\left(\\frac{2}{11} + \\frac{9}{11} - 1\\right)$.', '$P = \\frac{5}{7} \\cdot \\left(\\frac{2}{11} + \\frac{9}{11} - 1\\right)$.'),
            s('Step 2: Simplify inside parentheses', 'Bước 2: Tính trong ngoặc', '$\\frac{2}{11} + \\frac{9}{11} - 1 = 1 - 1 = 0$, so $P = 0$.', '$1 - 1 = 0$, suy ra $P = 0$.'),
          ],
          'Therefore, $P = 0$.',
          'Vậy $P = 0$.'
        ),
      ],
      ['Khẩu quyết tiếng Anh dễ nhớ: "Keep – Change – Flip".']
    ),
    lesson(
      6, 6, 27,
      'Two Basic Problems on Fractions',
      'Hai bài toán về phân số',
      ['Find a fraction of a given number ($a \\cdot \\frac{m}{n}$).', 'Find the whole number when a fraction $\\frac{m}{n}$ of it equals $b$ ($b : \\frac{m}{n}$).'],
      ['Tìm giá trị phân số $\\frac{m}{n}$ của một số cho trước.', 'Tìm một số biết giá trị phân số $\\frac{m}{n}$ của nó bằng $b$.'],
      [
        v('g6l27-v1', 'fraction of a number', 'n phr', 'giá trị phân số của một số', 'To find $\\frac{m}{n}$ of $a$, multiply $a \\cdot \\frac{m}{n}$.', 'Muốn tìm $\\frac{m}{n}$ của số $a$, ta tính $a \\cdot \\frac{m}{n}$.', 'What is $\\frac{3}{5}$ of $40$? Calculate $40 \\cdot \\frac{3}{5} = 24$.', 'Tìm $\\frac{3}{5}$ của $40$: lấy $40 \\cdot \\frac{3}{5} = 24$.'),
        v('g6l27-v2', 'find the whole given a part', 'v phr', 'tìm một số biết giá trị phân số của nó', 'If $\\frac{m}{n}$ of $x$ is $b$, then $x = b : \\frac{m}{n}$.', 'Nếu $\\frac{m}{n}$ của số đó là $b$ thì số cần tìm là $b : \\frac{m}{n}$.', 'If $\\frac{2}{3}$ of a class is $24$ students, the whole class has $24 : \\frac{2}{3} = 36$ students.', 'Nếu $\\frac{2}{3}$ lớp là $24$ học sinh thì cả lớp có $24 : \\frac{2}{3} = 36$ học sinh.'),
      ],
      [
        n('g6l27-n1', '\\frac{m}{n} \\text{ of } a = a \\cdot \\frac{m}{n}', 'm over n of a equals a times m over n', 'm phần n của a bằng a nhân m phần n'),
      ],
      [
        e('g6l27-e1', 'describe', 'The word "of" signals multiplication when finding a part of a known total.', 'Từ "of" (của tổng đã biết) thường ứng với phép nhân khi tìm một phần.'),
        e('g6l27-e2', 'question', 'Are we given the whole quantity or only a fractional part of it?', 'Đề bài cho biết toàn bộ hay chỉ cho giá trị của một phần?'),
        e('g6l27-e3', 'present', 'Since $18$ corresponds to $\\frac{3}{4}$ of the total, we divide $18 : \\frac{3}{4} = 24$.', 'Vì $18$ tương ứng với $\\frac{3}{4}$ tổng số nên ta tính $18 : \\frac{3}{4} = 24$.'),
      ],
      [
        ex(
          'g6l27-ex1',
          'Distinguishing the two basic fraction problems',
          'Phân biệt hai bài toán cơ bản về phân số',
          'A basket has $45$ apples, and $\\frac{2}{5}$ are green. Another basket has $18$ green apples, which is $\\frac{3}{4}$ of its total. Find both counts.',
          'Giỏ thứ nhất có $45$ quả táo, trong đó $\\frac{2}{5}$ là táo xanh. Giỏ thứ hai có $18$ quả táo xanh chiếm $\\frac{3}{4}$ tổng số táo của giỏ. Tính số táo xanh giỏ I và tổng số táo giỏ II.',
          [
            s('Step 1: Basket I (Problem 1 - Multiply)', 'Bước 1: Giỏ I (Bài toán 1 - Nhân)', 'Green apples in Basket I: $45 \\cdot \\frac{2}{5} = 18$.', 'Số táo xanh giỏ I: $45 \\cdot \\frac{2}{5} = 18$ quả.'),
            s('Step 2: Basket II (Problem 2 - Divide)', 'Bước 2: Giỏ II (Bài toán 2 - Chia)', 'Total apples in Basket II: $18 : \\frac{3}{4} = 18 \\cdot \\frac{4}{3} = 24$.', 'Tổng số táo giỏ II: $18 : \\frac{3}{4} = 24$ quả.'),
          ],
          'Basket I has $18$ green apples; Basket II has $24$ apples in total.',
          'Giỏ I có $18$ quả táo xanh; giỏ II có $24$ quả táo.'
        ),
      ],
      ['Câu hỏi phân biệt nhanh: "Known whole $\\to$ Multiply; Find whole $\\to$ Divide".']
    ),
  ]),
  chapter(6, 7, 'Decimals', 'Số thập phân', [
    lesson(
      6, 7, 28,
      'Decimals',
      'Số thập phân',
      ['Read positive and negative decimals using "point" in English.', 'Convert between decimal fractions and decimal notation, and compare decimals.'],
      ['Đọc đúng số thập phân âm và dương theo tiếng Anh (dùng từ `point`).', 'Đổi phân số thập phân sang số thập phân và so sánh số thập phân.'],
      [
        v('g6l28-v1', 'decimal / decimal point', 'n phr', 'số thập phân / dấu phẩy thập phân', 'A number with a fractional part separated by a decimal point ($3.14$ in English, $3{,}14$ in Vietnamese).', 'Số gồm phần nguyên và phần thập phân ngăn cách bởi dấu thập phân.', 'Read $3.14$ as "three point one four".', 'Số $3{,}14$ đọc bằng tiếng Anh là "three point one four".'),
        v('g6l28-v2', 'decimal fraction', 'n phr', 'phân số thập phân', 'A fraction whose denominator is a power of $10$, such as $10, 100, 1\\,000$.', 'Phân số có mẫu là lũy thừa của $10$.', '$\\frac{-27}{100} = -0.27$.', '$\\frac{-27}{100} = -0{,}27$.'),
      ],
      [
        n('g6l28-n1', '-12.05', 'negative twelve point zero five', 'âm mười hai phẩy không năm', 'Digits after the decimal point are read one by one in English.', 'Các chữ số sau dấu phẩy tiếng Anh đọc tách rời từng chữ số.'),
      ],
      [
        e('g6l28-e1', 'describe', 'In English, write a dot for the decimal point and read every digit after it individually.', 'Trong tiếng Anh, dùng dấu chấm thập phân và đọc từng chữ số một sau dấu chấm.'),
        e('g6l28-e2', 'question', 'How do we compare $-4.15$ and $-4.2$?', 'Ta so sánh hai số $-4{,}15$ và $-4{,}2$ như thế nào?'),
        e('g6l28-e3', 'present', 'Since $4.15 < 4.20$, taking opposites gives $-4.15 > -4.2$.', 'Vì $4{,}15 < 4{,}20$ nên lấy số đối ta được $-4{,}15 > -4{,}2$.'),
      ],
      [
        ex(
          'g6l28-ex1',
          'Converting decimal fractions and comparing',
          'Viết phân số thập phân thành số thập phân và so sánh',
          'Convert $\\frac{-35}{100}$ and $\\frac{7}{-20}$ to decimals and compare them.',
          'Viết $\\frac{-35}{100}$ và $\\frac{7}{-20}$ dưới dạng số thập phân rồi so sánh.',
          [
            s('Step 1: Convert both to decimals', 'Bước 1: Đổi sang số thập phân', '$\\frac{-35}{100} = -0.35$ and $\\frac{7}{-20} = \\frac{-35}{100} = -0.35$.', '$\\frac{-35}{100} = -0{,}35$ và $\\frac{7}{-20} = \\frac{-35}{100} = -0{,}35$.'),
            s('Step 2: Compare', 'Bước 2: So sánh', 'Both equal $-0.35$.', 'Cả hai đều bằng $-0{,}35$.'),
          ],
          'The two numbers are equal.',
          'Hai số bằng nhau.'
        ),
      ],
      ['Dấu chấm/phẩy ngược nhau giữa tiếng Anh (`3.14`, `1,250`) và tiếng Việt (`3,14`, `1.250`).']
    ),
    lesson(
      6, 7, 29,
      'Operations on Decimals',
      'Tính toán với số thập phân',
      ['Add, subtract, multiply, and divide positive and negative decimals.', 'Explain decimal point placement and sign rules cleanly.'],
      ['Thực hiện cộng, trừ, nhân, chia số thập phân âm và dương.', 'Giải thích vị trí dấu phẩy thập phân và quy tắc dấu.'],
      [
        v('g6l29-v1', 'decimal places', 'n phr', 'chữ số phần thập phân', 'The number of digits to the right of the decimal point.', 'Số chữ số nằm bên phải dấu thập phân.', 'Count the total decimal places in both factors.', 'Đếm tổng số chữ số ở phần thập phân của cả hai thừa số.'),
        v('g6l29-v2', 'shift the decimal point', 'v phr', 'dịch chuyển dấu phẩy thập phân', 'Moving the decimal point left or right when multiplying or dividing by $10^n$.', 'Dịch dấu phẩy sang trái hoặc phải khi nhân chia với $10, 100, 0{,}1$.', 'Multiplying by $0.01$ shifts the decimal point two places left.', 'Nhân với $0{,}01$ làm dấu phẩy dịch sang trái hai chữ số.'),
      ],
      [
        n('g6l29-n1', '(-1.5) \\cdot (-0.4) = 0.6', 'negative one point five times negative zero point four equals zero point six', 'âm một phẩy năm nhân âm không phẩy bốn bằng không phẩy sáu'),
      ],
      [
        e('g6l29-e1', 'describe', 'To divide by a decimal, shift both decimal points right until the divisor is an integer.', 'Để chia cho số thập phân, ta dịch dấu phẩy cả số bị chia và số chia sao cho số chia là số nguyên.'),
        e('g6l29-e2', 'question', 'How many decimal places will the product $(-2.4) \\cdot 0.15$ have?', 'Tích $(-2{,}4) \\cdot 0{,}15$ có bao nhiêu chữ số thập phân trước khi rút gọn số $0$ tận cùng?'),
        e('g6l29-e3', 'present', 'Grouping compatible decimals gives $12.7 + (-4.5) - 2.7 = (12.7 - 2.7) - 4.5 = 5.5$.', 'Nhóm các số hợp lí: $(12{,}7 - 2{,}7) - 4{,}5 = 5{,}5$.'),
      ],
      [
        ex(
          'g6l29-ex1',
          'Clever decimal calculation',
          'Tính hợp lí với số thập phân',
          'Evaluate $(-3.7) \\cdot 4.2 + 5.8 \\cdot (-3.7)$.',
          'Tính $(-3{,}7) \\cdot 4{,}2 + 5{,}8 \\cdot (-3{,}7)$.',
          [
            s('Step 1: Factor out $-3.7$', 'Bước 1: Đặt thừa số chung $-3{,}7$', '$(-3.7) \\cdot (4.2 + 5.8)$.', '$(-3{,}7) \\cdot (4{,}2 + 5{,}8)$.'),
            s('Step 2: Multiply', 'Bước 2: Nhân với $10$', '$(-3.7) \\cdot 10 = -37$.', '$(-3{,}7) \\cdot 10 = -37$.'),
          ],
          'The result is $-37$.',
          'Kết quả là $-37$.'
        ),
      ],
      ['Luôn viết số $0$ đứng trước dấu chấm thập phân ($0.5$) trong trình bày song ngữ chuẩn.']
    ),
    lesson(
      6, 7, 30,
      'Rounding and Estimating',
      'Làm tròn và ước lượng',
      ['Round numbers to tens, hundreds, tenths, or hundredths.', 'Estimate products and sums quickly to check reasonableness.'],
      ['Làm tròn số đến hàng chục, hàng trăm, hàng phần mười, hàng phần trăm.', 'Ước lượng kết quả phép tính để kiểm tra tính hợp lí.'],
      [
        v('g6l30-v1', 'round to the nearest tenth / hundredth', 'v phr', 'làm tròn đến hàng phần mười / phần trăm', 'Approximating a decimal to one or two decimal places.', 'Làm tròn số thập phân đến $1$ hoặc $2$ chữ số thập phân.', 'Round $3.146$ to the nearest hundredth to get $3.15$.', 'Làm tròn $3{,}146$ đến hàng phần trăm được $3{,}15$.'),
        v('g6l30-v2', 'round up / round down', 'v phr', 'làm tròn lên / làm tròn xuống', 'Increasing the kept digit by $1$ if the next digit is $\\ge 5$, or dropping trailing digits if $< 5$.', 'Tăng $1$ đơn vị nếu chữ số sau $\\ge 5$, hoặc giữ nguyên nếu $< 5$.', 'Since the thousandths digit is $6 \\ge 5$, we round up.', 'Vì chữ số hàng phần nghìn là $6 \\ge 5$ nên ta làm tròn lên.'),
        v('g6l30-v3', 'estimate', 'v / n', 'ước lượng', 'Finding an approximate value quickly by rounding operands first.', 'Tính gần đúng bằng cách làm tròn các số trước khi thực hiện phép tính.', 'Estimate $19.8 \\times 5.1$ as $20 \\times 5 = 100$.', 'Ước lượng $19{,}8 \\times 5{,}1 \\approx 20 \\times 5 = 100$.'),
      ],
      [
        n('g6l30-n1', '3.146 \\approx 3.15', 'three point one four six is approximately equal to three point one five', '3 phẩy 146 xấp xỉ 3 phẩy 15'),
      ],
      [
        e('g6l30-e1', 'describe', 'Look at the first dropped digit: if it is $5$ or more, add $1$ to the last kept digit.', 'Xem chữ số đầu tiên bỏ đi: nếu từ $5$ trở lên thì cộng $1$ vào chữ số cuối giữ lại.'),
        e('g6l30-e2', 'question', 'What is $47\\,280$ rounded to the nearest thousand?', 'Số $47\\,280$ làm tròn đến hàng nghìn được bao nhiêu?'),
        e('g6l30-e3', 'present', 'Rounding to the nearest tenth gives $8.96 \\approx 9.0$.', 'Làm tròn đến hàng phần mười ta được $8{,}96 \\approx 9{,}0$.'),
      ],
      [
        ex(
          'g6l30-ex1',
          'Rounding and estimating a shopping bill',
          'Làm tròn và ước lượng hóa đơn',
          'Round $12.348$ to the nearest tenth and estimate $4.9 \\times 7.12$.',
          'Làm tròn $12{,}348$ đến hàng phần mười và ước lượng $4{,}9 \\times 7{,}12$.',
          [
            s('Step 1: Round $12.348$', 'Bước 1: Làm tròn $12{,}348$', 'The tenths digit is $3$ and the next digit is $4 < 5$, so $12.348 \\approx 12.3$.', 'Hàng phần mười là $3$, chữ số liền sau là $4 < 5$ nên $12{,}348 \\approx 12{,}3$.'),
            s('Step 2: Estimate product', 'Bước 2: Ước lượng tích', '$4.9 \\approx 5$ and $7.12 \\approx 7$, so $4.9 \\times 7.12 \\approx 5 \\times 7 = 35$.', '$4{,}9 \\approx 5$ và $7{,}12 \\approx 7$, nên $4{,}9 \\times 7{,}12 \\approx 35$.'),
          ],
          'Rounded value is $12.3$; estimated product is $35$.',
          'Giá trị làm tròn là $12{,}3$; ước lượng tích khoảng $35$.'
        ),
      ],
      ['Phân biệt `tenths` (hàng phần mười, có `-th`) với `tens` (hàng chục).']
    ),
    lesson(
      6, 7, 31,
      'Some Problems on Ratios and Percentages',
      'Một số bài toán về tỉ số và tỉ số phần trăm',
      ['Compute the ratio and percentage ratio of two quantities with the same unit.', 'Solve discount, VAT, and interest percentage problems.'],
      ['Tính tỉ số và tỉ số phần trăm của hai đại lượng cùng đơn vị.', 'Giải bài toán giảm giá, thuế VAT, lãi suất đơn giản.'],
      [
        v('g6l31-v1', 'ratio / percentage', 'n', 'tỉ số / tỉ số phần trăm', 'The quotient $\\frac{a}{b}$ of two quantities, or $\\frac{a}{b} \\cdot 100\\%$.', 'Thương $\\frac{a}{b}$ của hai đại lượng cùng đơn vị, và $\\frac{a}{b} \\cdot 100\\%$.', 'The percentage of $18$ out of $24$ is $\\frac{18}{24} \\cdot 100\\% = 75\\%$.', 'Tỉ số phần trăm của $18$ và $24$ là $75\\%$.'),
        v('g6l31-v2', 'discount / original price / sale price', 'n phr', 'giảm giá / giá gốc / giá bán sau giảm', 'Reduction from marked price by a given percent.', 'Số tiền được giảm theo phần trăm so với giá niêm yết.', 'With a $20\\%$ discount, the customer pays $80\\%$ of the original price.', 'Giảm giá $20\\%$ nghĩa là khách hàng trả $80\\%$ giá gốc.'),
      ],
      [
        n('g6l31-n1', '\\frac{a}{b} \\cdot 100\\%', 'a divided by b times one hundred percent', 'a chia b nhân một trăm phần trăm'),
      ],
      [
        e('g6l31-e1', 'describe', 'Before forming a ratio, convert both quantities to the exact same unit.', 'Trước khi lập tỉ số, phải đổi hai đại lượng về cùng một đơn vị đo.'),
        e('g6l31-e2', 'question', 'If an item costs $500\\,000$ VND and is discounted by $15\\%$, what is the sale price?', 'Một món hàng giá $500\\,000$ đồng được giảm $15\\%$ thì giá bán là bao nhiêu?'),
        e('g6l31-e3', 'present', 'Paying $85\\%$ of the original price gives $500\\,000 \\cdot 85\\% = 425\\,000$ VND.', 'Trả $85\\%$ giá gốc ta được $500\\,000 \\cdot 85\\% = 425\\,000$ đồng.'),
      ],
      [
        ex(
          'g6l31-ex1',
          'Calculating percentage and finding original price',
          'Tính tỉ số phần trăm và tìm giá ban đầu',
          'After a $20\\%$ discount, a shirt costs $240\\,000$ VND. Find its original price.',
          'Sau khi giảm giá $20\\%$, một chiếc áo có giá $240\\,000$ đồng. Tính giá ban đầu của áo.',
          [
            s('Step 1: Find remaining percentage', 'Bước 1: Tìm phần trăm tương ứng', 'The sale price represents $100\\% - 20\\% = 80\\%$ of the original price.', 'Giá sau giảm ứng với $100\\% - 20\\% = 80\\%$ giá gốc.'),
            s('Step 2: Divide to recover $100\\%$', 'Bước 2: Chia cho $80\\%$', '$240\\,000 : 80\\% = 240\\,000 : 0.8 = 300\\,000$ VND.', '$240\\,000 : 80\\% = 300\\,000$ đồng.'),
          ],
          'The original price was $300\\,000$ VND.',
          'Giá ban đầu của chiếc áo là $300\\,000$ đồng.'
        ),
      ],
      ['Bài toán tìm giá gốc luôn chia cho tỉ lệ phần trăm tương ứng ($100\\% - \\text{giảm}$ hoặc $100\\% + \\text{tăng}$).']
    ),
  ]),
  chapter(6, 8, 'Basic Geometric Shapes', 'Những hình hình học cơ bản', [
    lesson(
      6, 8, 32,
      'Points and Lines',
      'Điểm và đường thẳng',
      ['Distinguish points ($A, B$) and lines ($a, d$) and express incidence ($A \\in d$).', 'Classify intersecting lines and parallel lines, and identify collinear points.'],
      ['Phân biệt điểm, đường thẳng và diễn đạt điểm thuộc/không thuộc đường thẳng.', 'Nhận biết hai đường thẳng cắt nhau, song song và ba điểm thẳng hàng.'],
      [
        v('g6l32-v1', 'point / line', 'n', 'điểm / đường thẳng', 'A point denotes an exact location; a straight line extends endlessly in both directions.', 'Điểm chỉ một vị trí; đường thẳng kéo dài vô tận về hai phía.', 'Points are named with capital letters $A, B$; lines with lowercase letters $a, d$ or two points $AB$.', 'Điểm kí hiệu chữ in hoa $A, B$; đường thẳng kí hiệu chữ thường $a, d$ hoặc hai điểm $AB$.'),
        v('g6l32-v2', 'collinear points', 'n phr', 'các điểm thẳng hàng', 'Three or more points lying on the exact same straight line.', 'Ba hay nhiều điểm cùng nằm trên một đường thẳng.', 'Points $A, B, C$ are collinear if they lie on line $d$.', 'Ba điểm $A, B, C$ thẳng hàng nếu chúng cùng thuộc đường thẳng $d$.'),
        v('g6l32-v3', 'intersecting / parallel lines', 'n phr', 'đường thẳng cắt nhau / song song', 'Lines sharing one common point vs. distinct lines with no common point.', 'Hai đường thẳng có đúng một điểm chung và hai đường thẳng không có điểm chung.', 'Lines $a$ and $b$ intersect at point $M$.', 'Hai đường thẳng $a$ và $b$ cắt nhau tại điểm $M$.'),
      ],
      [
        n('g6l32-n1', 'A \\in d, \\; B \\notin d', 'point A lies on line d, and point B does not lie on line d', 'điểm A thuộc đường thẳng d, điểm B không thuộc đường thẳng d'),
      ],
      [
        e('g6l32-e1', 'describe', 'There is one and only one straight line passing through two distinct points $A$ and $B$.', 'Có một và chỉ một đường thẳng đi qua hai điểm phân biệt $A$ và $B$.'),
        e('g6l32-e2', 'question', 'How many intersection points can two distinct lines have at most?', 'Hai đường thẳng phân biệt có nhiều nhất bao nhiêu điểm chung?'),
        e('g6l32-e3', 'present', 'Lines $m$ and $n$ have no common point, so they are parallel: $m \\parallel n$.', 'Hai đường thẳng $m$ và $n$ không có điểm chung nên chúng song song: $m \\parallel n$.'),
      ],
      [
        ex(
          'g6l32-ex1',
          'Counting lines through given points',
          'Đếm số đường thẳng đi qua các điểm',
          'Given $4$ points $A, B, C, D$ where no three are collinear, how many distinct lines pass through pairs of them?',
          'Cho $4$ điểm $A, B, C, D$ trong đó không có ba điểm nào thẳng hàng. Kẻ được bao nhiêu đường thẳng đi qua các cặp điểm đó?',
          [
            s('Step 1: List pairs from $A$', 'Bước 1: Liệt kê các đường qua $A$', 'Lines $AB, AC, AD$ ($3$ lines).', 'Có $3$ đường thẳng là $AB, AC, AD$.'),
            s('Step 2: List remaining pairs', 'Bước 2: Liệt kê các cặp còn lại', 'From $B$: $BC, BD$ ($2$ new). From $C$: $CD$ ($1$ new). Total: $3 + 2 + 1 = 6$.', 'Thêm $BC, BD, CD$. Tổng cộng $3 + 2 + 1 = 6$ đường thẳng.'),
          ],
          'There are $6$ distinct lines.',
          'Vẽ được tất cả $6$ đường thẳng phân biệt.'
        ),
      ],
      ['Trong hình học, $A \\in d$ đọc tự nhiên là `point A lies on line d` hoặc `d passes through A`.']
    ),
    lesson(
      6, 8, 33,
      'Point Between Two Points. Rays',
      'Điểm nằm giữa hai điểm. Tia',
      ['Determine when point $B$ lies between $A$ and $C$ on a line.', 'Define a ray, opposite rays, and identical rays accurately.'],
      ['Xác định điểm nằm giữa hai điểm trên cùng một đường thẳng.', 'Phân biệt tia, hai tia đối nhau và hai tia trùng nhau.'],
      [
        v('g6l33-v1', 'lies between', 'v phr', 'nằm giữa', 'On a line, point $B$ lies between $A$ and $C$ if $A$ and $C$ lie on opposite sides of $B$.', 'Trên một đường thẳng, $B$ nằm giữa $A$ và $C$ khi $A, C$ nằm về hai phía đối với $B$.', 'If $B$ lies between $A$ and $C$, then $BA$ and $BC$ are opposite rays.', 'Nếu $B$ nằm giữa $A$ và $C$ thì $BA$ và $BC$ là hai tia đối nhau.'),
        v('g6l33-v2', 'ray', 'n', 'tia', 'A part of a line consisting of an endpoint $O$ and all points on one side of $O$.', 'Hình gồm điểm gốc $O$ và một phần đường thẳng bị chia ra bởi điểm $O$.', 'Ray $Ox$ starts at endpoint $O$ and extends infinitely through $x$.', 'Tia $Ox$ có gốc $O$ và kéo dài vô tận về phía $x$.'),
        v('g6l33-v3', 'opposite rays', 'n phr', 'hai tia đối nhau', 'Two rays with the same endpoint forming a straight line together.', 'Hai tia chung gốc và tạo thành một đường thẳng.', 'Rays $Ox$ and $Oy$ are opposite rays.', 'Hai tia $Ox$ và $Oy$ là hai tia đối nhau.'),
      ],
      [
        n('g6l33-n1', '\\text{Ray } Ox', 'ray O x, with endpoint O', 'tia Ox gốc O'),
      ],
      [
        e('g6l33-e1', 'describe', 'Always state the endpoint first when naming a ray: ray $AB$ starts at $A$, not $B$.', 'Luôn đọc tên điểm gốc trước khi đọc tên tia: tia $AB$ có gốc $A$, khác với tia $BA$.'),
        e('g6l33-e2', 'question', 'On line $xy$, if point $M$ lies between $A$ and $B$, name a pair of opposite rays.', 'Trên đường thẳng $xy$, nếu $M$ nằm giữa $A$ và $B$, hãy nêu một cặp tia đối nhau.'),
        e('g6l33-e3', 'present', 'Since $A$ and $B$ lie on the same side of $O$, rays $OA$ and $OB$ coincide.', 'Vì $A$ và $B$ nằm cùng phía đối với $O$ nên hai tia $OA$ và $OB$ trùng nhau.'),
      ],
      [
        ex(
          'g6l33-ex1',
          'Identifying opposite and identical rays',
          'Nhận biết hai tia đối nhau và trùng nhau',
          'On a line, point $O$ lies between $A$ and $B$, and $C$ lies on ray $OB$ ($C \\ne O$). Identify opposite and coincident rays.',
          'Trên đường thẳng, $O$ nằm giữa $A$ và $B$, còn $C$ nằm trên tia $OB$ ($C \\ne O$). Chỉ ra các tia đối nhau và trùng nhau.',
          [
            s('Step 1: Check same-side points', 'Bước 1: Xét các điểm nằm cùng phía gốc $O$', '$B$ and $C$ are on the same side of $O$, so rays $OB$ and $OC$ coincide.', '$B$ và $C$ nằm cùng phía đối với $O$ nên tia $OB$ trùng tia $OC$.'),
            s('Step 2: Check opposite side', 'Bước 2: Xét phía đối diện', '$A$ is on the opposite side of $O$, so ray $OA$ is opposite to both $OB$ and $OC$.', '$A$ nằm khác phía đối với $O$ nên tia $OA$ đối với cả tia $OB$ và $OC$.'),
          ],
          'Rays $OB$ and $OC$ coincide; $OA$ is opposite to $OB$ (and $OC$).',
          'Hai tia $OB, OC$ trùng nhau; tia $OA$ đối với tia $OB$ (và $OC$).'
        ),
      ],
      ['Nhắc học sinh `ray AB` $\\ne$ `ray BA` vì điểm đầu tiên luôn là gốc.']
    ),
    lesson(
      6, 8, 34,
      'Line Segments. Length of a Line Segment',
      'Đoạn thẳng. Độ dài đoạn thẳng',
      ['Distinguish a line segment $\\overline{AB}$ as a geometric figure and its length $AB$ as a number.', 'Apply the segment addition property $AM + MB = AB$ when $M$ lies between $A$ and $B$.'],
      ['Phân biệt đoạn thẳng (hình) và độ dài đoạn thẳng (số đo).', 'Áp dụng đẳng thức $AM + MB = AB$ khi $M$ nằm giữa $A$ và $B$.'],
      [
        v('g6l34-v1', 'line segment', 'n phr', 'đoạn thẳng', 'The figure consisting of two endpoints $A, B$ and all points between them.', 'Hình gồm hai điểm mút $A, B$ và tất cả các điểm nằm giữa $A$ và $B$.', 'Line segment $AB$ has two endpoints $A$ and $B$.', 'Đoạn thẳng $AB$ có hai đầu mút là $A$ và $B$.'),
        v('g6l34-v2', 'length of a segment', 'n phr', 'độ dài đoạn thẳng', 'A positive number measuring the distance between two endpoints.', 'Một số dương đo khoảng cách giữa hai đầu mút.', 'The length of segment $AB$ is $AB = 5\\text{ cm}$.', 'Độ dài đoạn thẳng $AB$ là $AB = 5\\text{ cm}$.'),
      ],
      [
        n('g6l34-n1', '\\overline{AB} \\text{ vs. } AB', 'segment A B as a geometric figure, versus A B as its length', 'đoạn thẳng AB (hình) phân biệt với độ dài đoạn AB (số đo)', 'In international English, $\\overline{AB}$ denotes the geometric segment while $AB$ denotes its length.', 'Sách tiếng Anh viết $\\overline{AB}$ cho hình đoạn thẳng và $AB$ cho số đo độ dài.'),
      ],
      [
        e('g6l34-e1', 'describe', 'If point $M$ lies between $A$ and $B$, then $AM + MB = AB$.', 'Nếu điểm $M$ nằm giữa $A$ và $B$ thì $AM + MB = AB$.'),
        e('g6l34-e2', 'question', 'On ray $Ox$, if $OA = 3\\text{ cm}$ and $OB = 7\\text{ cm}$, which point lies between the other two?', 'Trên tia $Ox$, nếu $OA = 3\\text{ cm}$ và $OB = 7\\text{ cm}$ thì điểm nào nằm giữa?'),
        e('g6l34-e3', 'present', 'Since $OA < OB$, point $A$ lies between $O$ and $B$, giving $AB = 7 - 3 = 4\\text{ cm}$.', 'Vì $OA < OB$ nên $A$ nằm giữa $O$ và $B$, suy ra $AB = 7 - 3 = 4\\text{ cm}$.'),
      ],
      [
        ex(
          'g6l34-ex1',
          'Computing segment length on a ray',
          'Tính độ dài đoạn thẳng trên tia',
          'On ray $Ox$, take $M$ and $N$ with $OM = 4\\text{ cm}$ and $ON = 9\\text{ cm}$. Calculate $MN$.',
          'Trên tia $Ox$, lấy hai điểm $M, N$ sao cho $OM = 4\\text{ cm}$, $ON = 9\\text{ cm}$. Tính $MN$.',
          [
            s('Step 1: Determine which point lies between', 'Bước 1: Xác định điểm nằm giữa', 'Since $M, N$ lie on ray $Ox$ and $OM < ON$ ($4 < 9$), point $M$ lies between $O$ and $N$.', 'Trên tia $Ox$, vì $OM < ON$ nên $M$ nằm giữa $O$ và $N$.'),
            s('Step 2: Subtract lengths', 'Bước 2: Tính $MN$', '$OM + MN = ON \\Rightarrow MN = 9 - 4 = 5\\text{ cm}$.', '$OM + MN = ON \\Rightarrow MN = 9 - 4 = 5\\text{ cm}$.'),
          ],
          'Thus, $MN = 5\\text{ cm}$.',
          'Vậy $MN = 5\\text{ cm}$.'
        ),
      ],
      ['Chỉ rõ quy ước quốc tế: $\\overline{AB}$ là đoạn thẳng, $AB$ là độ dài, $\\overleftrightarrow{AB}$ là đường thẳng, $\\overrightarrow{AB}$ là tia.']
    ),
    lesson(
      6, 8, 35,
      'Midpoint of a Line Segment',
      'Trung điểm của đoạn thẳng',
      ['Verify both conditions for $M$ to be the midpoint of segment $AB$.', 'Compute lengths using $AM = MB = \\frac{AB}{2}$.'],
      ['Kiểm tra đủ hai điều kiện để $M$ là trung điểm của đoạn thẳng $AB$.', 'Tính độ dài dựa vào $AM = MB = \\frac{AB}{2}$.'],
      [
        v('g6l35-v1', 'midpoint', 'n', 'trung điểm', 'The point lying between $A$ and $B$ that is equidistant from both endpoints.', 'Điểm nằm giữa $A, B$ và cách đều hai đầu mút $A, B$.', '$M$ is the midpoint of $AB$ if $M$ lies between $A, B$ and $MA = MB$.', '$M$ là trung điểm của $AB$ khi $M$ nằm giữa $A, B$ và $MA = MB$.'),
        v('g6l35-v2', 'equidistant', 'adj', 'cách đều', 'Being at equal distance from two points.', 'Có khoảng cách bằng nhau tới hai điểm.', 'The midpoint is equidistant from both endpoints.', 'Trung điểm cách đều hai đầu mút của đoạn thẳng.'),
      ],
      [
        n('g6l35-n1', 'MA = MB = \\frac{AB}{2}', 'M A equals M B equals A B over two', 'MA bằng MB bằng AB chia hai'),
      ],
      [
        e('g6l35-e1', 'describe', 'Every line segment has one and only one midpoint.', 'Mỗi đoạn thẳng có duy nhất một trung điểm.'),
        e('g6l35-e2', 'question', 'If $MA = MB$, is $M$ always the midpoint of segment $AB$?', 'Nếu $MA = MB$ thì $M$ có chắc chắn là trung điểm của $AB$ không?'),
        e('g6l35-e3', 'present', 'Because $M$ lies between $A$ and $B$ and $MA = MB = 5\\text{ cm}$, $M$ is the midpoint of $AB$.', 'Vì $M$ nằm giữa $A$ và $B$ và $MA = MB = 5\\text{ cm}$ nên $M$ là trung điểm của $AB$.'),
      ],
      [
        ex(
          'g6l35-ex1',
          'Verifying a midpoint',
          'Kiểm tra trung điểm đoạn thẳng',
          'On ray $Ox$, plot $A$ and $B$ with $OA = 3\\text{ cm}$ and $OB = 6\\text{ cm}$. Is $A$ the midpoint of $OB$?',
          'Trên tia $Ox$, lấy $OA = 3\\text{ cm}$, $OB = 6\\text{ cm}$. Điểm $A$ có là trung điểm của $OB$ không?',
          [
            s('Step 1: Check "betweenness"', 'Bước 1: Kiểm tra điểm nằm giữa', 'Since $OA < OB$ ($3 < 6$), $A$ lies between $O$ and $B$.', 'Vì $OA < OB$ nên $A$ nằm giữa $O$ và $B$.'),
            s('Step 2: Compare $OA$ and $AB$', 'Bước 2: So sánh $OA$ và $AB$', '$AB = OB - OA = 6 - 3 = 3\\text{ cm} = OA$.', '$AB = 6 - 3 = 3\\text{ cm} = OA$.'),
          ],
          'Yes, $A$ is the midpoint of $OB$.',
          'Có, $A$ là trung điểm của đoạn thẳng $OB$.'
        ),
      ],
      ['Phản ví dụ quan trọng: nếu $M$ không nằm trên $AB$ mà vẫn có $MA = MB$ thì $M$ KHÔNG là trung điểm $AB$.']
    ),
    lesson(
      6, 8, 36,
      'Angles',
      'Góc',
      ['Define vertex and sides of an angle and read $\\widehat{xOy}$ or $\\angle xOy$.', 'Identify a straight angle ($180^\\circ$) and interior points of an angle.'],
      ['Nêu đỉnh và hai cạnh của góc, đọc kí hiệu $\\widehat{xOy}$ hoặc $\\angle xOy$.', 'Nhận biết góc bẹt và điểm nằm trong góc.'],
      [
        v('g6l36-v1', 'angle / vertex / sides', 'n', 'góc / đỉnh / hai cạnh', 'A figure formed by two rays sharing a common endpoint called the vertex.', 'Hình gồm hai tia chung gốc; gốc chung là đỉnh và hai tia là hai cạnh.', 'In $\\angle xOy$, $O$ is the vertex and rays $Ox, Oy$ are its sides.', 'Trong $\\widehat{xOy}$, $O$ là đỉnh và hai tia $Ox, Oy$ là hai cạnh.'),
        v('g6l36-v2', 'straight angle', 'n phr', 'góc bẹt', 'An angle formed by two opposite rays.', 'Góc có hai cạnh là hai tia đối nhau.', 'Two opposite rays $Ox$ and $Oy$ form a straight angle.', 'Hai tia đối nhau $Ox, Oy$ tạo thành một góc bẹt.'),
      ],
      [
        n('g6l36-n1', '\\widehat{xOy} \\text{ or } \\angle xOy', 'angle x O y', 'góc x O y', 'International English writes $\\angle xOy$ or $\\angle AOB$; Vietnamese uses $\\widehat{xOy}$.', 'Quốc tế hay dùng $\\angle xOy$, còn Việt Nam quen viết $\\widehat{xOy}$.'),
      ],
      [
        e('g6l36-e1', 'describe', 'When naming an angle with three letters, always put the vertex letter in the middle.', 'Khi đọc tên góc bằng ba chữ cái, chữ cái chỉ đỉnh luôn nằm ở chính giữa.'),
        e('g6l36-e2', 'question', 'How many angles are formed by three distinct rays sharing vertex $O$?', 'Ba tia phân biệt chung gốc $O$ tạo thành bao nhiêu góc?'),
        e('g6l36-e3', 'present', 'Point $M$ lies inside $\\angle xOy$ because it is not on the sides and lies between rays $Ox$ and $Oy$.', 'Điểm $M$ nằm trong góc $xOy$ vì tia $OM$ nằm giữa hai tia $Ox$ và $Oy$.'),
      ],
      [
        ex(
          'g6l36-ex1',
          'Naming angles from a vertex',
          'Đọc tên các góc tạo bởi ba tia chung gốc',
          'Three rays $Ox, Oy, Oz$ share endpoint $O$ (no two opposite). Name all angles formed.',
          'Cho ba tia $Ox, Oy, Oz$ chung gốc $O$ (không có hai tia nào đối nhau). Đọc tên tất cả các góc.',
          [
            s('Step 1: Pair the rays', 'Bước 1: Ghép từng cặp tia', 'Choose two rays out of three: $(Ox, Oy)$, $(Ox, Oz)$, and $(Oy, Oz)$.', 'Ghép cặp hai tia: $(Ox, Oy)$, $(Ox, Oz)$ và $(Oy, Oz)$.'),
            s('Step 2: Write angle notation', 'Bước 2: Viết kí hiệu góc', 'The three angles are $\\angle xOy$, $\\angle xOz$, and $\\angle yOz$.', 'Ba góc là $\\widehat{xOy}$, $\\widehat{xOz}$ và $\\widehat{yOz}$.'),
          ],
          'There are $3$ angles: $\\angle xOy, \\angle xOz, \\angle yOz$.',
          'Có $3$ góc là $\\widehat{xOy}, \\widehat{xOz}, \\widehat{yOz}$.'
        ),
      ],
      ['Luôn nhắc học sinh quy tắc đặt chữ cái đỉnh ở giữa: $\\angle AOB$ khác $\\angle OAB$.']
    ),
    lesson(
      6, 8, 37,
      'Angle Measure',
      'Số đo góc',
      ['Measure angles in degrees using a protractor.', 'Classify acute, right, obtuse, and straight angles.'],
      ['Đo số đo góc bằng thước đo góc với đơn vị độ.', 'Phân biệt góc nhọn, góc vuông, góc tù và góc bẹt.'],
      [
        v('g6l37-v1', 'protractor / degree', 'n', 'thước đo góc / độ', 'Instrument for measuring angles and the unit equal to $\\frac{1}{180}$ of a straight angle.', 'Dụng cụ đo góc và đơn vị độ ($1^\\circ$).', 'Align the center of the protractor with the vertex of the angle.', 'Đặt tâm thước đo góc trùng với đỉnh của góc.'),
        v('g6l37-v2', 'acute / right / obtuse angle', 'n phr', 'góc nhọn / góc vuông / góc tù', 'Angles measuring $0^\\circ < \\alpha < 90^\\circ$, $\\alpha = 90^\\circ$, and $90^\\circ < \\alpha < 180^\\circ$.', 'Các góc có số đo nhỏ hơn $90^\\circ$, bằng $90^\\circ$, và từ lớn hơn $90^\\circ$ đến nhỏ hơn $180^\\circ$.', '$45^\\circ$ is an acute angle, whereas $135^\\circ$ is an obtuse angle.', 'Góc $45^\\circ$ là góc nhọn, còn góc $135^\\circ$ là góc tù.'),
      ],
      [
        n('g6l37-n1', '0^\\circ < \\widehat{A} < 90^\\circ', 'angle A is between zero and ninety degrees, an acute angle', 'góc A lớn hơn 0 độ và nhỏ hơn 90 độ, là góc nhọn'),
      ],
      [
        e('g6l37-e1', 'describe', 'An angle smaller than a right angle is acute; an angle larger than a right angle yet less than $180^\\circ$ is obtuse.', 'Góc nhỏ hơn góc vuông là góc nhọn; góc lớn hơn góc vuông và nhỏ hơn góc bẹt là góc tù.'),
        e('g6l37-e2', 'question', 'What angle does a clock show at 3 o\'clock and at 5 o\'clock?', 'Kim giờ và kim phút lúc 3 giờ và 5 giờ tạo thành loại góc nào?'),
        e('g6l37-e3', 'present', 'At 5 o\'clock, the hands form an obtuse angle of $5 \\times 30^\\circ = 150^\\circ$.', 'Lúc 5 giờ, hai kim tạo thành góc tù có số đo $5 \\times 30^\\circ = 150^\\circ$.'),
      ],
      [
        ex(
          'g6l37-ex1',
          'Classifying angles on a clock face',
          'Phân loại góc trên mặt đồng hồ',
          'Find the angle between the hour and minute hands at 2:00 and classify it.',
          'Tìm số đo và phân loại góc giữa hai kim đồng hồ lúc 2 giờ đúng.',
          [
            s('Step 1: Angle per hour mark', 'Bước 1: Tính góc mỗi khoảng giờ', 'A full circle is $360^\\circ$, so each hour step equals $360^\\circ : 12 = 30^\\circ$.', 'Một vòng $360^\\circ$ chia $12$ giờ nên mỗi khoảng là $30^\\circ$.'),
            s('Step 2: Multiply by $2$ and classify', 'Bước 2: Nhân $2$ và phân loại', '$2 \\times 30^\\circ = 60^\\circ$, which satisfies $0^\\circ < 60^\\circ < 90^\\circ$.', '$2 \\times 30^\\circ = 60^\\circ$, thỏa $0^\\circ < 60^\\circ < 90^\\circ$.'),
          ],
          'The angle is $60^\\circ$, an acute angle.',
          'Góc đó đo được $60^\\circ$ và là góc nhọn.'
        ),
      ],
      ['Cặp từ hay nhầm phát âm: `acute` /əˈkjuːt/ và `obtuse` /əbˈtuːs/.']
    ),
  ]),
  chapter(6, 9, 'Data and Experimental Probability', 'Dữ liệu và xác suất thực nghiệm', [
    lesson(
      6, 9, 38,
      'Data and Data Collection',
      'Dữ liệu và thu thập dữ liệu',
      ['Distinguish numerical data and non-numerical (categorical) data.', 'Evaluate whether collected data is reasonable and valid.'],
      ['Phân biệt dữ liệu là số (số liệu) và dữ liệu không phải là số.', 'Nhận biết tính hợp lí của dữ liệu thống kê.'],
      [
        v('g6l38-v1', 'data / numerical data / categorical data', 'n phr', 'dữ liệu / số liệu / dữ liệu phân loại', 'Collected facts measured as numbers vs. names, colors, or categories.', 'Thông tin thu thập dạng con số hoặc dạng chữ/nhóm phân loại.', 'Heights in centimeters are numerical data, whereas favorite subjects are non-numerical data.', 'Chiều cao tính bằng cm là số liệu; môn học yêu thích là dữ liệu không phải số.'),
        v('g6l38-v2', 'outlier / unreasonable data', 'n phr', 'dữ liệu không hợp lí', 'A recorded value impossible for the given context.', 'Giá trị ghi nhận trái với thực tế hoặc quy định chung.', 'A recorded age of $-5$ or $250$ for a student is unreasonable.', 'Tuổi học sinh ghi $-5$ hoặc $250$ là dữ liệu không hợp lí.'),
      ],
      [
        n('g6l38-n1', '\\text{Quantitative (numerical) vs. Qualitative (non-numerical)}', 'quantitative numerical data versus qualitative non-numerical data', 'dữ liệu định lượng dạng số đối chiếu với dữ liệu định tính'),
      ],
      [
        e('g6l38-e1', 'describe', 'We collect data through observation, surveys, measurement, or reliable existing sources.', 'Ta thu thập dữ liệu bằng quan sát, lập phiếu hỏi, đo đạc hoặc tra cứu nguồn tin cậy.'),
        e('g6l38-e2', 'question', 'Which entry in this student table is not reasonable and why?', 'Dữ liệu nào trong bảng khảo sát chưa hợp lí và vì sao?'),
        e('g6l38-e3', 'present', 'All valid entries are positive integers consistent with the survey question.', 'Tất cả giá trị hợp lệ đều phù hợp với nội dung câu hỏi khảo sát.'),
      ],
      [
        ex(
          'g6l38-ex1',
          'Checking data validity',
          'Kiểm tra tính hợp lí của dữ liệu',
          'A Grade 6 class survey asks for shoe sizes and records: $36, 37, 38, 120, 39$. Spot the invalid value.',
          'Khảo sát cỡ giày học sinh lớp 6 thu được: $36; 37; 38; 120; 39$. Hãy chỉ ra dữ liệu không hợp lí.',
          [
            s('Step 1: Compare with context', 'Bước 1: Đối chiếu thực tế', 'Typical student shoe sizes range around $34$–$44$.', 'Cỡ giày học sinh THCS thông thường nằm trong khoảng $34$–$44$.'),
            s('Step 2: Identify error', 'Bước 2: Kết luận giá trị lỗi', '$120$ is far outside any human shoe size and is therefore invalid.', 'Giá trị $120$ vượt xa thực tế nên là dữ liệu không hợp lí.'),
          ],
          'The unreasonable entry is $120$.',
          'Số liệu không hợp lí là $120$.'
        ),
      ],
      ['Danh từ `data` trong toán phổ thông thường chia động từ số ít.']
    ),
    lesson(
      6, 9, 39,
      'Statistical Tables and Pictograms',
      'Bảng thống kê và biểu đồ tranh',
      ['Organize raw data into a frequency/statistical table.', 'Read and interpret symbols and half-symbols in a pictogram.'],
      ['Lập bảng thống kê từ dữ liệu thu thập ban đầu.', 'Đọc và giải thích ý nghĩa biểu tượng (và nửa biểu tượng) trong biểu đồ tranh.'],
      [
        v('g6l39-v1', 'statistical table', 'n phr', 'bảng thống kê', 'A structured table displaying categories and their corresponding counts or values.', 'Bảng trình bày các đối tượng kèm số liệu tương ứng.', 'Read the total from the statistical table.', 'Tính tổng số liệu từ bảng thống kê.'),
        v('g6l39-v2', 'pictogram / pictograph', 'n', 'biểu đồ tranh', 'A chart representing counts using repeated icons and a scale key.', 'Biểu đồ dùng hình ảnh biểu tượng và chú giải quy ước tỉ lệ.', 'If one book icon stands for $10$ books, half a book stands for $5$ books.', 'Nếu một hình quyển sách ứng với $10$ quyển thì nửa hình ứng với $5$ quyển.'),
      ],
      [
        n('g6l39-n1', '1\\text{ icon} = 10\\text{ units}', 'one icon represents ten units', 'một biểu tượng ứng với 10 đơn vị'),
      ],
      [
        e('g6l39-e1', 'describe', 'Always check the legend/key of a pictogram before counting the icons.', 'Luôn xem chú giải quy ước của biểu đồ tranh trước khi đếm số biểu tượng.'),
        e('g6l39-e2', 'question', 'How many items are represented by $3$ full icons and $1$ half icon if each icon equals $10$?', 'Nếu mỗi biểu tượng ứng với $10$ thì $3$ biểu tượng rưỡi biểu diễn bao nhiêu?'),
        e('g6l39-e3', 'present', 'Multiplying $3.5 \\times 10$ gives $35$ students.', 'Nhân $3{,}5 \\times 10$ ta được $35$ học sinh.'),
      ],
      [
        ex(
          'g6l39-ex1',
          'Reading a pictogram',
          'Đọc số liệu từ biểu đồ tranh',
          'A pictogram shows trees planted: Class 6A has $4$ tree icons, Class 6B has $3$ full icons and $1$ half icon, where each icon $= 10$ trees. Find total trees.',
          'Biểu đồ tranh số cây trồng: lớp 6A có $4$ hình cây, lớp 6B có $3$ hình nguyên và nửa hình (mỗi hình $= 10$ cây). Tính tổng số cây.',
          [
            s('Step 1: Compute Class 6A', 'Bước 1: Tính lớp 6A', '$4 \\times 10 = 40$ trees.', '$4 \\times 10 = 40$ cây.'),
            s('Step 2: Compute Class 6B and sum', 'Bước 2: Tính lớp 6B và cộng tổng', '$3 \\times 10 + 5 = 35$ trees; total $= 40 + 35 = 75$ trees.', '$3 \\times 10 + 5 = 35$ cây; tổng cộng $40 + 35 = 75$ cây.'),
          ],
          'Both classes planted $75$ trees altogether.',
          'Cả hai lớp trồng được $75$ cây.'
        ),
      ],
      ['Tiếng Anh Anh dùng `pictogram`, tiếng Anh Mỹ dùng `pictograph`.']
    ),
    lesson(
      6, 9, 40,
      'Bar Charts',
      'Biểu đồ cột',
      ['Read horizontal and vertical axes, bars, and gridlines of a bar chart.', 'Identify maximum, minimum, total, and percentage differences from bar heights.'],
      ['Đọc trục ngang, trục đứng và chiều cao cột trên biểu đồ cột.', 'Tìm giá trị lớn nhất, nhỏ nhất, tổng và độ chênh lệch từ biểu đồ.'],
      [
        v('g6l40-v1', 'bar chart / column chart', 'n phr', 'biểu đồ cột', 'A chart using rectangular bars of equal width whose heights are proportional to values.', 'Biểu đồ dùng các cột chữ nhật có chiều rộng bằng nhau, chiều cao tỉ lệ với số liệu.', 'The tallest bar corresponds to the most popular sport.', 'Cột cao nhất tương ứng với môn thể thao được yêu thích nhất.'),
        v('g6l40-v2', 'horizontal axis / vertical axis', 'n phr', 'trục nằm ngang / trục thẳng đứng', 'The base axis listing categories and the vertical axis showing numeric scale.', 'Trục ngang ghi đối tượng và trục đứng ghi thang đo số liệu.', 'The vertical axis shows the number of students.', 'Trục đứng biểu diễn số học sinh.'),
      ],
      [
        n('g6l40-n1', '\\text{Difference} = \\max - \\min', 'the difference equals the maximum value minus the minimum value', 'độ chênh lệch bằng giá trị lớn nhất trừ giá trị nhỏ nhất'),
      ],
      [
        e('g6l40-e1', 'describe', 'All bars in a bar chart must have the same width and even spacing.', 'Các cột trong biểu đồ cột phải có cùng bề rộng và khoảng cách đều nhau.'),
        e('g6l40-e2', 'question', 'By how much does the highest category exceed the lowest category?', 'Mục cao nhất hơn mục thấp nhất bao nhiêu đơn vị?'),
        e('g6l40-e3', 'present', 'Reading the vertical scale, Category A has $18$ and Category B has $12$.', 'Đọc trên trục đứng, mục A là $18$ và mục B là $12$.'),
      ],
      [
        ex(
          'g6l40-ex1',
          'Analyzing a bar chart',
          'Phân tích biểu đồ cột',
          'Books borrowed across 4 months are: Sep $45$, Oct $60$, Nov $50$, Dec $45$. Find the total and the peak month.',
          'Số sách mượn theo các tháng: tháng 9 là $45$, tháng 10 là $60$, tháng 11 là $50$, tháng 12 là $45$. Tính tổng và tìm tháng cao nhất.',
          [
            s('Step 1: Identify tallest bar', 'Bước 1: Tìm cột cao nhất', 'October has the highest value ($60$ books).', 'Tháng 10 có cột cao nhất ($60$ quyển).'),
            s('Step 2: Sum all four bars', 'Bước 2: Cộng tổng 4 cột', '$45 + 60 + 50 + 45 = 200$ books.', '$45 + 60 + 50 + 45 = 200$ quyển.'),
          ],
          'Total borrowed is $200$ books; peak month is October.',
          'Tổng số sách mượn là $200$ quyển; cao nhất là tháng 10.'
        ),
      ],
      ['Luôn đọc kĩ đơn vị ghi ở đỉnh trục đứng.']
    ),
    lesson(
      6, 9, 41,
      'Double Bar Charts',
      'Biểu đồ cột kép',
      ['Compare two paired data sets side by side using a double bar chart and legend.', 'Compute totals and differences between the two groups across categories.'],
      ['So sánh hai nhóm đối tượng song song qua biểu đồ cột kép và bảng chú giải.', 'Tính tổng và độ chênh lệch giữa hai nhóm theo từng mục.'],
      [
        v('g6l41-v1', 'double bar chart', 'n phr', 'biểu đồ cột kép', 'A bar chart placing two colored bars side by side for each category to compare two groups.', 'Biểu đồ ghép đôi hai cột khác màu cạnh nhau ở mỗi mục để so sánh hai nhóm.', 'Use a legend to tell boys\' and girls\' bars apart.', 'Dùng bảng chú giải màu để phân biệt cột nam và cột nữ.'),
        v('g6l41-v2', 'legend / key', 'n', 'chú giải màu', 'The box explaining which color or pattern corresponds to each data series.', 'Ô chú thích cho biết mỗi màu sắc biểu diễn nhóm dữ liệu nào.', 'Check the legend before reading the bars.', 'Xem bảng chú giải trước khi đọc biểu đồ.'),
      ],
      [
        n('g6l41-n1', '\\text{Gap} = |x_1 - x_2|', 'the gap between two groups in a category', 'độ chênh lệch giữa hai nhóm trong cùng một mục'),
      ],
      [
        e('g6l41-e1', 'describe', 'Double bar charts are ideal for comparing two classes or two time periods across the same categories.', 'Biểu đồ cột kép rất phù hợp để so sánh hai lớp hoặc hai thời điểm trên cùng các tiêu chí.'),
        e('g6l41-e2', 'question', 'In which category is the gap between the two groups largest?', 'Ở mục nào thì sự chênh lệch giữa hai nhóm là lớn nhất?'),
        e('g6l41-e3', 'present', 'In Class 6A, Good-grade students increased from $14$ in Term 1 to $19$ in Term 2.', 'Ở lớp 6A, số học sinh đạt loại Tốt tăng từ $14$ ở HK1 lên $19$ ở HK2.'),
      ],
      [
        ex(
          'g6l41-ex1',
          'Comparing two terms on a double bar chart',
          'So sánh hai học kì từ biểu đồ cột kép',
          'A double bar chart shows math club attendance for 6A vs 6B in Week 1 ($12$ vs $15$) and Week 2 ($18$ vs $14$). Compare Week 2.',
          'Biểu đồ cột kép ghi số học sinh 6A và 6B tham gia CLB Toán tuần 1 ($12$ và $15$), tuần 2 ($18$ và $14$). So sánh tuần 2.',
          [
            s('Step 1: Read Week 2 bars', 'Bước 1: Đọc hai cột ở tuần 2', 'Class 6A has $18$ students; Class 6B has $14$ students.', 'Lớp 6A có $18$ bạn; lớp 6B có $14$ bạn.'),
            s('Step 2: Compare and add', 'Bước 2: Tính hiệu và tổng', '6A exceeds 6B by $18 - 14 = 4$ students; total $= 18 + 14 = 32$.', '6A nhiều hơn 6B là $4$ bạn; tổng cả hai lớp là $32$ bạn.'),
          ],
          'In Week 2, 6A has $4$ more participants than 6B.',
          'Ở tuần 2, lớp 6A có nhiều hơn 6B $4$ học sinh.'
        ),
      ],
      ['Yêu cầu học sinh nêu rõ tên nhóm theo màu/chú giải khi trình bày kết quả.']
    ),
    lesson(
      6, 9, 42,
      'Possible Outcomes and Events in Experiments and Games',
      'Kết quả có thể và sự kiện trong trò chơi, thí nghiệm',
      ['List all possible outcomes when tossing a coin, rolling a die, or drawing a card/marble.', 'Classify whether an event occurs after observing a trial.'],
      ['Liệt kê các kết quả có thể xảy ra khi tung đồng xu, gieo xúc xắc, rút thẻ.', 'Nhận biết sự kiện có xảy ra hay không sau một lần thử nghiệm.'],
      [
        v('g6l42-v1', 'possible outcome', 'n phr', 'kết quả có thể', 'Every result that can happen in a trial or game.', 'Mỗi kết quả có thể xuất hiện trong một trò chơi hoặc thí nghiệm.', 'Tossing a coin has two possible outcomes: Head (H) and Tail (T).', 'Tung một đồng xu có hai kết quả có thể: Mặt sấp (S) và Mặt ngửa (N).'),
        v('g6l42-v2', 'fair six-sided die / dice', 'n phr', 'xúc xắc cân đối sáu mặt', 'A cube numbered $1$ to $6$ with each face equally likely.', 'Khối lập phương cân đối có $6$ mặt đánh số từ $1$ đến $6$.', 'The singular is "die", and the plural is "dice".', 'Số ít tiếng Anh là `die`, số nhiều là `dice`.'),
        v('g6l42-v3', 'event', 'n', 'sự kiện', 'A condition checked after performing a trial.', 'Một tình huống được kiểm tra xem có xảy ra sau phép thử hay không.', 'Rolling an even number is an event with outcomes $2, 4, 6$.', 'Sự kiện "gieo được mặt số chẵn" ứng với các mặt $2, 4, 6$.'),
      ],
      [
        n('g6l42-n1', '\\{1, 2, 3, 4, 5, 6\\}', 'the set of possible outcomes one through six', 'tập hợp các kết quả có thể từ 1 đến 6'),
      ],
      [
        e('g6l42-e1', 'describe', 'An event that must happen every time is certain; one that can never happen is impossible.', 'Sự kiện chắc chắn xảy ra là chắc chắn; không bao giờ xảy ra là không thể.'),
        e('g6l42-e2', 'question', 'List all possible outcomes when drawing one ball from a box with red, blue, and yellow balls.', 'Liệt kê các kết quả có thể về màu khi lấy ngẫu nhiên một quả bóng từ hộp có bóng đỏ, xanh, vàng.'),
        e('g6l42-e3', 'present', 'If face $5$ appears, the event "getting a number greater than $4$" has occurred.', 'Nếu mặt $5$ xuất hiện thì sự kiện "ra số lớn hơn $4$" đã xảy ra.'),
      ],
      [
        ex(
          'g6l42-ex1',
          'Listing outcomes and checking an event',
          'Liệt kê kết quả và xét sự kiện',
          'A spinner has sections numbered $1, 2, 3, 4$. List all possible outcomes and the favorable outcomes for getting a prime number.',
          'Vòng quay có $4$ ô ghi số $1, 2, 3, 4$. Liệt kê các kết quả có thể và các kết quả làm xảy ra sự kiện "quay được số nguyên tố".',
          [
            s('Step 1: List all outcomes', 'Bước 1: Liệt kê toàn bộ kết quả', 'All possible outcomes: $1, 2, 3, 4$.', 'Các kết quả có thể là $1; 2; 3; 4$.'),
            s('Step 2: Filter prime numbers', 'Bước 2: Chọn số nguyên tố', '$1$ is not prime; the prime outcomes are $2$ and $3$.', '$1$ không phải số nguyên tố; các kết quả thuận lợi là $2$ và $3$.'),
          ],
          'Favorable outcomes are $2$ and $3$.',
          'Các kết quả làm sự kiện xảy ra là $2$ và $3$.'
        ),
      ],
      ['Tiếng Anh gọi mặt sấp/ngửa của đồng xu là `Tail (T)` và `Head (H)`; `die` là số ít của `dice`.']
    ),
    lesson(
      6, 9, 43,
      'Experimental Probability',
      'Xác suất thực nghiệm',
      ['Compute experimental probability as number of occurrences divided by total number of trials.', 'Recognize how increasing the number of trials stabilizes experimental probability.'],
      ['Tính xác suất thực nghiệm bằng tỉ số giữa số lần xuất hiện sự kiện và tổng số lần thử.', 'Nhận xét sự ổn định của xác suất thực nghiệm khi số lần thử lớn.'],
      [
        v('g6l43-v1', 'experimental probability', 'n phr', 'xác suất thực nghiệm', 'The ratio $\\frac{\\text{number of times event } E \\text{ occurs}}{\\text{total number of trials}}$.', 'Tỉ số giữa số lần sự kiện $E$ xảy ra và tổng số lần thực hiện phép thử.', 'In $50$ coin tosses, if Heads appears $27$ times, the experimental probability of Heads is $\\frac{27}{50} = 0.54$.', 'Tung đồng xu $50$ lần có $27$ lần ngửa thì xác suất thực nghiệm ra mặt ngửa là $\\frac{27}{50} = 0{,}54$.'),
        v('g6l43-v2', 'trial / frequency', 'n', 'phép thử (lần thử) / số lần xuất hiện', 'One repetition of the experiment and the count of times a specific outcome happens.', 'Mỗi lần thực hiện lại thí nghiệm và số lần kết quả đó xuất hiện.', 'Repeat the experiment $100$ times to record frequencies.', 'Thực hiện phép thử $100$ lần để ghi lại số lần xuất hiện.'),
      ],
      [
        n('g6l43-n1', 'P_{\\text{exp}}(E) = \\frac{k}{n}', 'the experimental probability of event E equals k over n', 'xác suất thực nghiệm của sự kiện E bằng k phần n'),
      ],
      [
        e('g6l43-e1', 'describe', 'Experimental probability always lies between $0$ and $1$ (or $0\\%$ and $100\\%$).', 'Xác suất thực nghiệm luôn nhận giá trị từ $0$ đến $1$ (tức $0\\%$ đến $100\\%$).'),
        e('g6l43-e2', 'question', 'How does the experimental probability behave as we perform more trials?', 'Xác suất thực nghiệm thay đổi thế nào khi ta tăng số lần thực hiện phép thử?'),
        e('g6l43-e3', 'present', 'Out of $40$ draws, a blue ball appeared $10$ times, giving experimental probability $\\frac{10}{40} = \\frac{1}{4} = 25\\%$.', 'Trong $40$ lần lấy có $10$ lần bóng xanh, nên xác suất thực nghiệm là $\\frac{10}{40} = \\frac{1}{4} = 25\\%$.'),
      ],
      [
        ex(
          'g6l43-ex1',
          'Calculating experimental probability',
          'Tính xác suất thực nghiệm',
          'Lan tossed a coin $80$ times and got Tail $36$ times. Find the experimental probability of getting Tail and of getting Head.',
          'Lan tung đồng xu $80$ lần, thấy xuất hiện mặt sấp $36$ lần. Tính xác suất thực nghiệm xuất hiện mặt sấp và mặt ngửa.',
          [
            s('Step 1: Experimental probability of Tail', 'Bước 1: Xác suất thực nghiệm mặt sấp', '$P(\\text{Tail}) = \\frac{36}{80} = \\frac{9}{20} = 0.45$.', 'Xác suất thực nghiệm mặt sấp là $\\frac{36}{80} = \\frac{9}{20} = 0{,}45$.'),
            s('Step 2: Experimental probability of Head', 'Bước 2: Xác suất thực nghiệm mặt ngửa', 'Head appeared $80 - 36 = 44$ times, so $P(\\text{Head}) = \\frac{44}{80} = \\frac{11}{20} = 0.55$.', 'Mặt ngửa xuất hiện $80 - 36 = 44$ lần nên xác suất thực nghiệm là $\\frac{44}{80} = \\frac{11}{20} = 0{,}55$.'),
          ],
          'Experimental probabilities are $0.45$ (Tail) and $0.55$ (Head).',
          'Xác suất thực nghiệm lần lượt là $0{,}45$ (sấp) và $0{,}55$ (ngửa).'
        ),
      ],
      ['Xác suất thực nghiệm có thể biểu diễn dưới dạng phân số tối giản, số thập phân hoặc phần trăm.']
    ),
  ]),
];
