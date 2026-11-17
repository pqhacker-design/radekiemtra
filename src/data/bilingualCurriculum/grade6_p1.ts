import { chapter, e, ex, lesson, n, s, v } from './helpers';
import { CurriculumChapter } from './types';

export const GRADE_6_CHAPTERS_1_TO_5: CurriculumChapter[] = [
  chapter(6, 1, 'The Set of Natural Numbers', 'Tập hợp các số tự nhiên', [
    lesson(
      6, 1, 1,
      'Sets',
      'Tập hợp',
      ['Recognize a set and its elements using listing and set-builder descriptions.', 'Use the membership symbols $\\in$ and $\\notin$ accurately in English and Vietnamese.'],
      ['Nhận biết tập hợp và các phần tử của tập hợp theo hai cách mô tả.', 'Sử dụng đúng các kí hiệu thuộc ($\\in$) và không thuộc ($\\notin$).'],
      [
        v('g6l1-v1', 'set', 'n', 'tập hợp', 'A well-defined collection of distinct objects or numbers.', 'Một nhóm các đối tượng hoặc số được xác định rõ ràng.', 'Let $A$ be the set of natural numbers less than $5$.', 'Gọi $A$ là tập hợp các số tự nhiên nhỏ hơn $5$.'),
        v('g6l1-v2', 'element / member', 'n', 'phần tử', 'An individual object belonging to a set.', 'Mỗi đối tượng nằm trong một tập hợp.', '$3$ is an element of set $A$.', '$3$ là một phần tử của tập hợp $A$.'),
        v('g6l1-v3', 'belongs to / does not belong to', 'v phr', 'thuộc / không thuộc', 'Membership relation between an element and a set.', 'Quan hệ một phần tử có nằm trong tập hợp hay không.', '$2 \\in A$ means $2$ belongs to $A$, while $7 \\notin A$.', '$2 \\in A$ nghĩa là $2$ thuộc $A$, còn $7 \\notin A$ là $7$ không thuộc $A$.'),
      ],
      [
        n('g6l1-n1', 'A = \\{0; 1; 2; 3; 4\\}', 'set A equals the set containing zero, one, two, three, four', 'tập hợp A gồm các phần tử 0, 1, 2, 3, 4', 'Use commas in English `{0, 1, 2}` and semicolons `{0; 1; 2}` in Vietnamese.', 'Tiếng Anh dùng dấu phẩy giữa các phần tử, tiếng Việt dùng dấu chấm phẩy.'),
        n('g6l1-n2', 'x \\in A, \\quad y \\notin A', 'x belongs to A, and y does not belong to A', 'x thuộc A, và y không thuộc A'),
      ],
      [
        e('g6l1-e1', 'describe', 'Each element of a set is listed only once, and the order of listing does not matter.', 'Mỗi phần tử chỉ được liệt kê một lần và không phân biệt thứ tự liệt kê.'),
        e('g6l1-e2', 'question', 'How can we write this set by stating the characteristic property of its elements?', 'Ta có thể viết tập hợp này bằng cách chỉ ra tính chất đặc trưng như thế nào?'),
        e('g6l1-e3', 'present', 'By listing all elements, we obtain $B = \\{1, 3, 5, 7, 9\\}$.', 'Liệt kê các phần tử, ta được $B = \\{1; 3; 5; 7; 9\\}$.'),
      ],
      [
        ex(
          'g6l1-ex1',
          'Describing a set in two ways',
          'Mô tả tập hợp bằng hai cách',
          'Write the set $M$ of natural numbers less than $6$ by listing elements and by characteristic property.',
          'Viết tập hợp $M$ các số tự nhiên nhỏ hơn $6$ bằng cách liệt kê và chỉ ra tính chất đặc trưng.',
          [
            s('Step 1: Identify elements', 'Bước 1: Xác định các phần tử', 'The natural numbers strictly less than $6$ are $0, 1, 2, 3, 4, 5$.', 'Các số tự nhiên nhỏ hơn $6$ là $0; 1; 2; 3; 4; 5$.'),
            s('Step 2: Write by listing', 'Bước 2: Viết theo cách liệt kê', 'Write $M = \\{0, 1, 2, 3, 4, 5\\}$.', 'Viết $M = \\{0; 1; 2; 3; 4; 5\\}$.'),
            s('Step 3: Write by property', 'Bước 3: Viết theo tính chất đặc trưng', 'Write $M = \\{x \\in \\mathbb{N} \\mid x < 6\\}$.', 'Viết $M = \\{x \\in \\mathbb{N} \\mid x < 6\\}$.'),
          ],
          'Both forms represent the exact same set $M$.',
          'Hai cách viết đều biểu diễn cùng một tập hợp $M$.'
        ),
      ],
      ['Tiếng Anh thường dùng dấu phẩy để ngăn cách các phần tử trong dấu ngoặc nhọn $\\{1, 2, 3\\}$, còn SGK Việt Nam dùng dấu chấm phẩy $\\{1; 2; 3\\}$.']
    ),
    lesson(
      6, 1, 2,
      'Way of Writing Natural Numbers in the Decimal System',
      'Cách ghi số tự nhiên trong hệ thập phân',
      ['Distinguish $\\mathbb{N}$ and $\\mathbb{N}^*$, and read place values in the decimal system.', 'Read and convert basic Roman numerals up to $30$.'],
      ['Phân biệt tập hợp $\\mathbb{N}$ và $\\mathbb{N}^*$, đọc đúng giá trị theo hàng trong hệ thập phân.', 'Đọc và viết đúng các chữ số La Mã cơ bản.'],
      [
        v('g6l2-v1', 'natural number', 'n phr', 'số tự nhiên', 'Any number in the set $\\mathbb{N} = \\{0, 1, 2, 3, \\dots\\}$.', 'Mỗi số thuộc tập hợp $\\mathbb{N} = \\{0; 1; 2; 3; \\dots\\}$.', 'Zero is the smallest natural number.', 'Số $0$ là số tự nhiên nhỏ nhất.'),
        v('g6l2-v2', 'place value / digit', 'n phr', 'giá trị theo hàng / chữ số', 'The value represented by a digit based on its position (ones, tens, hundreds, thousands).', 'Giá trị của mỗi chữ số tùy thuộc vào vị trí hàng đơn vị, chục, trăm, nghìn.', 'In $2\\,405$, the digit $4$ is in the hundreds place.', 'Trong số $2\\,405$, chữ số $4$ ở hàng trăm.'),
        v('g6l2-v3', 'Roman numeral', 'n phr', 'chữ số La Mã', 'Numeral symbols I, V, X used to write numbers in the Roman system.', 'Các kí hiệu I, V, X dùng để ghi số theo hệ La Mã.', 'The Roman numeral XIV represents $14$.', 'Số La Mã XIV biểu diễn số $14$.'),
      ],
      [
        n('g6l2-n1', '\\mathbb{N}^* = \\{1; 2; 3; \\dots\\}', 'the set of non-zero natural numbers, or N star', 'tập hợp các số tự nhiên khác 0, đọc là N sao'),
        n('g6l2-n2', '\\overline{ab} = 10a + b', 'the two-digit number a b equals ten a plus b', 'số có hai chữ số a b ngang bằng 10a cộng b'),
      ],
      [
        e('g6l2-e1', 'describe', 'Every group of three digits from right to left forms a class: units, thousands, millions, billions.', 'Cứ mỗi ba chữ số kể từ phải sang trái lập thành một lớp: đơn vị, nghìn, triệu, tỉ.'),
        e('g6l2-e2', 'question', 'What is the value of the digit $7$ in the number $37\\,520$?', 'Giá trị của chữ số $7$ trong số $37\\,520$ là bao nhiêu?'),
        e('g6l2-e3', 'present', 'Expanding in powers of ten gives $2\\,305 = 2 \\times 1\\,000 + 3 \\times 100 + 5$.', 'Viết dưới dạng tổng theo hàng ta có $2\\,305 = 2 \\times 1\\,000 + 3 \\times 100 + 5$.'),
      ],
      [
        ex(
          'g6l2-ex1',
          'Place value expansion',
          'Phân tích số theo giá trị các hàng',
          'Expand $\\overline{abc}$ and compute the value of $4\\,708$ by place values.',
          'Viết cấu tạo thập phân của $\\overline{abc}$ và phân tích số $4\\,708$ theo các hàng.',
          [
            s('Step 1: General form', 'Bước 1: Dạng tổng quát', 'A three-digit number is $\\overline{abc} = 100a + 10b + c$ with $a \\ne 0$.', 'Số có ba chữ số là $\\overline{abc} = 100a + 10b + c$ với $a \\ne 0$.'),
            s('Step 2: Identify digits of $4\\,708$', 'Bước 2: Xác định từng chữ số của $4\\,708$', 'Thousands: $4$, hundreds: $7$, tens: $0$, ones: $8$.', 'Hàng nghìn: $4$, hàng trăm: $7$, hàng chục: $0$, hàng đơn vị: $8$.'),
            s('Step 3: Write the sum', 'Bước 3: Viết thành tổng', '$4\\,708 = 4 \\times 1\\,000 + 7 \\times 100 + 0 \\times 10 + 8$.', '$4\\,708 = 4 \\times 1\\,000 + 7 \\times 100 + 0 \\times 10 + 8$.'),
          ],
          'The digit $7$ represents $700$.',
          'Chữ số $7$ có giá trị là $700$.'
        ),
      ],
      ['Tiếng Anh tách hàng nghìn bằng dấu phẩy ($10,000$), khác với dấu chấm hoặc khoảng trắng ($10\\,000$) trong tiếng Việt.']
    ),
    lesson(
      6, 1, 3,
      'Ordering Natural Numbers',
      'Thứ tự trong tập hợp các số tự nhiên',
      ['Compare two natural numbers and place them on a number line.', 'Read inequality symbols $<, >, \\le, \\ge$ fluently in English.'],
      ['So sánh hai số tự nhiên và biểu diễn trên tia số.', 'Đọc thành thạo các dấu bất đẳng thức $<, >, \\le, \\ge$ bằng tiếng Anh.'],
      [
        v('g6l3-v1', 'number ray / number line', 'n phr', 'tia số / trục số', 'A ray starting at $0$ marked with equally spaced points representing numbers.', 'Tia bắt đầu từ gốc $0$ với các vạch cách đều biểu diễn các số tự nhiên.', 'On a horizontal number line, numbers increase from left to right.', 'Trên tia số nằm ngang, các số tăng dần từ trái sang phải.'),
        v('g6l3-v2', 'successor / predecessor', 'n', 'số liền sau / số liền trước', 'For $n$, $n+1$ is the successor and $n-1$ ($n \\ge 1$) is the predecessor.', 'Với số $n$, $n+1$ là số liền sau và $n-1$ ($n \\ge 1$) là số liền trước.', 'The successor of $99$ is $100$.', 'Số liền sau của $99$ là $100$.'),
        v('g6l3-v3', 'ascending / descending order', 'n phr', 'thứ tự tăng dần / giảm dần', 'Arranging numbers from smallest to largest or largest to smallest.', 'Sắp xếp các số từ bé đến lớn hoặc từ lớn đến bé.', 'Arrange the numbers in ascending order.', 'Hãy sắp xếp các số theo thứ tự tăng dần.'),
      ],
      [
        n('g6l3-n1', 'a \\le b', 'a is less than or equal to b', 'a nhỏ hơn hoặc bằng b'),
        n('g6l3-n2', '3 < x \\le 7', 'x is greater than three and less than or equal to seven', 'x lớn hơn 3 và nhỏ hơn hoặc bằng 7'),
      ],
      [
        e('g6l3-e1', 'describe', 'If point $a$ lies to the left of point $b$ on the number line, then $a < b$.', 'Nếu điểm $a$ nằm bên trái điểm $b$ trên tia số nằm ngang thì $a < b$.'),
        e('g6l3-e2', 'question', 'Which natural numbers satisfy $5 < x \\le 8$?', 'Những số tự nhiên nào thỏa mãn $5 < x \\le 8$?'),
        e('g6l3-e3', 'present', 'Comparing digit by digit from left to right, we find $24\\,510 > 24\\,499$.', 'So sánh từng chữ số từ trái sang phải, ta thấy $24\\,510 > 24\\,499$.'),
      ],
      [
        ex(
          'g6l3-ex1',
          'Finding natural numbers in an interval',
          'Tìm số tự nhiên trong một khoảng',
          'List all natural numbers $x$ such that $12 \\le x < 16$.',
          'Liệt kê tất cả các số tự nhiên $x$ thỏa mãn $12 \\le x < 16$.',
          [
            s('Step 1: Read lower bound', 'Bước 1: Đọc chặn dưới', '$12 \\le x$ includes $12$.', '$12 \\le x$ có lấy giá trị $12$.'),
            s('Step 2: Read upper bound', 'Bước 2: Đọc chặn trên', '$x < 16$ excludes $16$, so stop at $15$.', '$x < 16$ không lấy $16$, nên dừng ở $15$.'),
          ],
          'The required natural numbers are $12, 13, 14, 15$.',
          'Các số tự nhiên cần tìm là $12; 13; 14; 15$.'
        ),
      ],
      ['Nhắc học sinh cụm "less than or equal to" ($\\le$), "at most" (nhiều nhất là), "at least" (ít nhất là).']
    ),
    lesson(
      6, 1, 4,
      'Addition and Subtraction of Natural Numbers',
      'Phép cộng và phép trừ số tự nhiên',
      ['Name terms in addition (addend, sum) and subtraction (minuend, subtrahend, difference).', 'Apply commutative and associative properties for mental calculation.'],
      ['Nêu đúng tên gọi số hạng, tổng, số bị trừ, số trừ, hiệu bằng tiếng Anh.', 'Vận dụng tính chất giao hoán, kết hợp để tính nhẩm hợp lí.'],
      [
        v('g6l4-v1', 'addend / sum', 'n', 'số hạng / tổng', 'Numbers being added together and the result of addition.', 'Các số đem cộng và kết quả của phép cộng.', 'In $a + b = c$, $a$ and $b$ are addends and $c$ is the sum.', 'Trong $a + b = c$, $a$ và $b$ là số hạng, $c$ là tổng.'),
        v('g6l4-v2', 'minuend / subtrahend / difference', 'n', 'số bị trừ / số trừ / hiệu', 'In $a - b = c$, $a$ is the minuend, $b$ is the subtrahend, and $c$ is the difference.', 'Trong $a - b = c$, $a$ là số bị trừ, $b$ là số trừ và $c$ là hiệu.', 'The difference $a - b$ exists in $\\mathbb{N}$ when $a \\ge b$.', 'Hiệu $a - b$ tồn tại trong $\\mathbb{N}$ khi $a \\ge b$.'),
        v('g6l4-v3', 'commutative / associative property', 'n phr', 'tính chất giao hoán / kết hợp', '$a+b = b+a$ and $(a+b)+c = a+(b+c)$.', 'Đổi chỗ hoặc nhóm các số hạng không làm thay đổi tổng.', 'Group $73 + 27$ using the associative property.', 'Nhóm $73 + 27$ nhờ tính chất kết hợp.'),
      ],
      [
        n('g6l4-n1', 'a + b = b + a', 'a plus b equals b plus a', 'a cộng b bằng b cộng a'),
        n('g6l4-n2', 'a - b = c', 'a minus b equals c, or subtract b from a', 'a trừ b bằng c'),
      ],
      [
        e('g6l4-e1', 'describe', 'Pairing numbers that sum to a multiple of ten makes mental addition faster.', 'Ghép các số có tổng tròn chục hoặc tròn trăm giúp tính nhẩm nhanh hơn.'),
        e('g6l4-e2', 'question', 'How do we find an unknown addend or minuend?', 'Ta tìm số hạng chưa biết hoặc số bị trừ như thế nào?'),
        e('g6l4-e3', 'present', 'Grouping compatible terms gives $(64 + 36) + 125 = 100 + 125 = 225$.', 'Nhóm các số tròn trăm ta được $(64 + 36) + 125 = 100 + 125 = 225$.'),
      ],
      [
        ex(
          'g6l4-ex1',
          'Smart calculation using properties',
          'Tính hợp lí bằng tính chất phép cộng',
          'Calculate $86 + 357 + 14$ efficiently and solve $x - 25 = 48$.',
          'Tính hợp lí $86 + 357 + 14$ và tìm $x$ biết $x - 25 = 48$.',
          [
            s('Step 1: Commute and associate', 'Bước 1: Giao hoán và kết hợp', '$86 + 357 + 14 = (86 + 14) + 357 = 100 + 357 = 457$.', '$86 + 357 + 14 = (86 + 14) + 357 = 100 + 357 = 457$.'),
            s('Step 2: Solve for $x$', 'Bước 2: Tìm $x$', 'Since $x$ is the minuend, $x = 48 + 25 = 73$.', 'Vì $x$ là số bị trừ nên $x = 48 + 25 = 73$.'),
          ],
          'The sum is $457$, and $x = 73$.',
          'Tổng bằng $457$ và $x = 73$.'
        ),
      ],
      ['Chú ý cấu trúc "subtract $b$ from $a$" tương ứng $a - b$.']
    ),
    lesson(
      6, 1, 5,
      'Multiplication and Division of Natural Numbers',
      'Phép nhân và phép chia số tự nhiên',
      ['Use factor, product, dividend, divisor, quotient, and remainder accurately.', 'Apply the distributive property and perform Euclidean division.'],
      ['Nêu đúng thừa số, tích, số bị chia, số chia, thương, số dư.', 'Áp dụng tính chất phân phối và phép chia có dư.'],
      [
        v('g6l5-v1', 'factor / product', 'n', 'thừa số / tích', 'In $a \\cdot b = c$, $a$ and $b$ are factors and $c$ is the product.', 'Trong $a \\cdot b = c$, $a$ và $b$ là thừa số, $c$ là tích.', 'If one factor is zero, the product is zero.', 'Nếu một thừa số bằng $0$ thì tích bằng $0$.'),
        v('g6l5-v2', 'dividend / divisor / quotient / remainder', 'n', 'số bị chia / số chia / thương / số dư', 'Components in division $a = b \\cdot q + r$ with $0 \\le r < b$.', 'Các thành phần trong phép chia $a = b \\cdot q + r$ với $0 \\le r < b$.', 'Dividing $23$ by $5$ gives a quotient of $4$ and a remainder of $3$.', 'Chia $23$ cho $5$ được thương là $4$ và số dư là $3$.'),
        v('g6l5-v3', 'distributive property', 'n phr', 'tính chất phân phối', '$a(b + c) = ab + ac$.', 'Tính chất phân phối của phép nhân đối với phép cộng.', 'Factor out $27$ using the distributive property.', 'Đặt nhân tử chung $27$ bằng tính chất phân phối.'),
      ],
      [
        n('g6l5-n1', 'a = b \\cdot q + r \\;(0 \\le r < b)', 'a equals b times q plus r, where r is non-negative and less than b', 'a bằng b nhân q cộng r, với 0 nhỏ hơn hoặc bằng r nhỏ hơn b'),
      ],
      [
        e('g6l5-e1', 'describe', 'The remainder is always strictly less than the divisor.', 'Số dư bao giờ cũng nhỏ hơn hẳn số chia.'),
        e('g6l5-e2', 'question', 'What common factor can we factor out in this expression?', 'Ta có thể đặt thừa số chung nào trong biểu thức này?'),
        e('g6l5-e3', 'present', 'Applying the distributive property, $37 \\cdot 64 + 37 \\cdot 36 = 37 \\cdot (64 + 36) = 3\\,700$.', 'Áp dụng tính chất phân phối, $37 \\cdot 64 + 37 \\cdot 36 = 37 \\cdot (64 + 36) = 3\\,700$.'),
      ],
      [
        ex(
          'g6l5-ex1',
          'Division with remainder in a real problem',
          'Phép chia có dư trong bài toán thực tế',
          'A school needs buses with $45$ seats for $200$ students. How many buses are needed at least?',
          'Một trường cần thuê xe $45$ chỗ cho $200$ học sinh. Hỏi cần ít nhất bao nhiêu xe?',
          [
            s('Step 1: Divide $200$ by $45$', 'Bước 1: Chia $200$ cho $45$', '$200 = 45 \\times 4 + 20$, so the quotient is $4$ and the remainder is $20$.', '$200 = 45 \\times 4 + 20$, thương là $4$ và dư $20$.'),
            s('Step 2: Interpret the remainder', 'Bước 2: Lí giải số dư', 'The remaining $20$ students still need one extra bus.', '$20$ học sinh còn dư vẫn cần thêm $1$ xe nữa.'),
          ],
          'At least $4 + 1 = 5$ buses are needed.',
          'Cần ít nhất $4 + 1 = 5$ xe.'
        ),
      ],
      ['Chú ý phân biệt "divisor" (số chia) và "dividend" (số bị chia).']
    ),
    lesson(
      6, 1, 6,
      'Powers with Natural Exponents',
      'Lũy thừa với số mũ tự nhiên',
      ['Read and write base, exponent, squared, cubed, and $n$-th power.', 'Multiply and divide powers with the same base.'],
      ['Đọc đúng cơ số, số mũ, bình phương, lập phương, lũy thừa bậc $n$.', 'Thực hiện nhân và chia hai lũy thừa cùng cơ số.'],
      [
        v('g6l6-v1', 'power / base / exponent', 'n', 'lũy thừa / cơ số / số mũ', 'In $a^n$, $a$ is the base, $n$ is the exponent, and $a^n$ is the $n$-th power of $a$.', 'Trong $a^n$, $a$ là cơ số, $n$ là số mũ và $a^n$ là lũy thừa bậc $n$ của $a$.', 'In $5^3$, $5$ is the base and $3$ is the exponent.', 'Trong $5^3$, $5$ là cơ số và $3$ là số mũ.'),
        v('g6l6-v2', 'squared / cubed', 'adj', 'bình phương / lập phương', 'Special readings for exponent $2$ and exponent $3$.', 'Cách đọc đặc biệt cho số mũ $2$ và số mũ $3$.', '$7^2$ is read "seven squared", and $4^3$ is "four cubed".', '$7^2$ đọc là 7 bình phương, $4^3$ đọc là 4 lập phương.'),
      ],
      [
        n('g6l6-n1', 'a^m \\cdot a^n = a^{m+n}', 'a to the m times a to the n equals a to the m plus n', 'a mũ m nhân a mũ n bằng a mũ m cộng n'),
        n('g6l6-n2', 'a^m : a^n = a^{m-n} \\;(a \\ne 0, m \\ge n)', 'a to the m divided by a to the n equals a to the m minus n', 'a mũ m chia a mũ n bằng a mũ m trừ n'),
      ],
      [
        e('g6l6-e1', 'describe', 'When multiplying powers with the same base, keep the base and add the exponents.', 'Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ.'),
        e('g6l6-e2', 'question', 'By convention, what is $a^0$ equal to for $a \\ne 0$?', 'Theo quy ước, $a^0$ bằng bao nhiêu với $a \\ne 0$?'),
        e('g6l6-e3', 'present', 'Dividing powers with base $3$, we get $3^7 : 3^4 = 3^{7-4} = 3^3 = 27$.', 'Chia hai lũy thừa cùng cơ số $3$, ta được $3^7 : 3^4 = 3^{7-4} = 3^3 = 27$.'),
      ],
      [
        ex(
          'g6l6-ex1',
          'Operating with powers of the same base',
          'Tính toán lũy thừa cùng cơ số',
          'Write the result as a single power: $2^4 \\cdot 2^3 : 2^5$.',
          'Viết kết quả dưới dạng một lũy thừa: $2^4 \\cdot 2^3 : 2^5$.',
          [
            s('Step 1: Multiply first two powers', 'Bước 1: Nhân hai lũy thừa đầu', '$2^4 \\cdot 2^3 = 2^{4+3} = 2^7$.', '$2^4 \\cdot 2^3 = 2^{4+3} = 2^7$.'),
            s('Step 2: Divide by $2^5$', 'Bước 2: Chia cho $2^5$', '$2^7 : 2^5 = 2^{7-5} = 2^2$.', '$2^7 : 2^5 = 2^{7-5} = 2^2$.'),
          ],
          'The expression equals $2^2 = 4$.',
          'Biểu thức bằng $2^2 = 4$.'
        ),
      ],
      ['Tiếng Anh thường viết phép chia lũy thừa bằng dấu $\\div$ hoặc phân số $\\frac{a^m}{a^n}$ thay vì dấu hai chấm $:$.']
    ),
    lesson(
      6, 1, 7,
      'Order of Operations',
      'Thứ tự thực hiện các phép tính',
      ['Apply standard order of operations without brackets and with nested brackets.', 'Explain each evaluation step clearly in English and Vietnamese.'],
      ['Thực hiện đúng thứ tự phép tính với biểu thức không ngoặc và có ngoặc.', 'Diễn đạt từng bước tính rõ ràng bằng song ngữ Anh – Việt.'],
      [
        v('g6l7-v1', 'order of operations', 'n phr', 'thứ tự thực hiện phép tính', 'Powers first, then multiplication/division from left to right, then addition/subtraction from left to right.', 'Lũy thừa trước, rồi nhân chia từ trái sang phải, cuối cùng cộng trừ từ trái sang phải.', 'Follow the order of operations carefully.', 'Thực hiện đúng thứ tự các phép tính.'),
        v('g6l7-v2', 'parentheses / brackets / braces', 'n', 'ngoặc tròn / ngoặc vuông / ngoặc nhọn', 'Grouping symbols evaluated from innermost $( )$ to $[ ]$ to $\\{ \\}$.', 'Các dấu ngoặc được tính theo thứ tự từ trong ra ngoài: $( ) \\to [ ] \\to \\{ \\}$.', 'Evaluate the parentheses inside the square brackets first.', 'Tính biểu thức trong ngoặc tròn bên trong ngoặc vuông trước.'),
      ],
      [
        n('g6l7-n1', '(\\dots) \\to [\\dots] \\to \\{\\dots\\}', 'parentheses first, then square brackets, then curly braces', 'tính ngoặc tròn trước, đến ngoặc vuông, rồi đến ngoặc nhọn'),
      ],
      [
        e('g6l7-e1', 'describe', 'Inside each level of brackets, still apply powers before multiplication and addition.', 'Bên trong mỗi cặp ngoặc vẫn ưu tiên lũy thừa trước nhân chia và cộng trừ.'),
        e('g6l7-e2', 'question', 'Which operation should we compute first inside the brackets?', 'Ta cần tính phép toán nào trước tiên ở bên trong ngoặc?'),
        e('g6l7-e3', 'present', 'Evaluating the power first gives $2 \\cdot 3^2 - 10 = 2 \\cdot 9 - 10 = 8$.', 'Tính lũy thừa trước ta được $2 \\cdot 3^2 - 10 = 2 \\cdot 9 - 10 = 8$.'),
      ],
      [
        ex(
          'g6l7-ex1',
          'Evaluating an expression with nested brackets',
          'Tính giá trị biểu thức có nhiều dấu ngoặc',
          'Compute $A = 100 : \\{2 \\cdot [52 - (35 - 8)]\\}$.',
          'Tính giá trị $A = 100 : \\{2 \\cdot [52 - (35 - 8)]\\}$.',
          [
            s('Step 1: Innermost parentheses', 'Bước 1: Ngoặc tròn trong cùng', '$35 - 8 = 27$.', '$35 - 8 = 27$.'),
            s('Step 2: Square brackets', 'Bước 2: Ngoặc vuông', '$52 - 27 = 25$.', '$52 - 27 = 25$.'),
            s('Step 3: Curly braces and final division', 'Bước 3: Ngoặc nhọn và phép chia cuối', '$2 \\cdot 25 = 50$, so $A = 100 : 50 = 2$.', '$2 \\cdot 25 = 50$, suy ra $A = 100 : 50 = 2$.'),
          ],
          'Thus, $A = 2$.',
          'Vậy $A = 2$.'
        ),
      ],
      ['Phân biệt rõ: `parentheses` $( )$, `square brackets` $[ ]$, `curly braces` $\\{ \\}$.']
    ),
  ]),
  chapter(6, 2, 'Divisibility in the Set of Natural Numbers', 'Tính chia hết trong tập hợp các số tự nhiên', [
    lesson(
      6, 2, 8,
      'Divisibility Relation and Properties',
      'Quan hệ chia hết và tính chất',
      ['Define divisor, multiple, and read the divisibility notation $a \\vdots b$.', 'Apply divisibility properties of a sum and a difference.'],
      ['Nêu khái niệm ước và bội, đọc kí hiệu chia hết $a \\vdots b$.', 'Vận dụng tính chất chia hết của một tổng và một hiệu.'],
      [
        v('g6l8-v1', 'is divisible by', 'v phr', 'chia hết cho', 'Number $a$ is divisible by $b \\ne 0$ if $a = b \\cdot q$ for some natural number $q$.', 'Số $a$ chia hết cho $b \\ne 0$ nếu có số tự nhiên $q$ sao cho $a = b \\cdot q$.', '$24$ is divisible by $6$.', '$24$ chia hết cho $6$.'),
        v('g6l8-v2', 'divisor / multiple', 'n', 'ước / bội', 'If $a \\vdots b$, then $b$ is a divisor of $a$ and $a$ is a multiple of $b$.', 'Nếu $a \\vdots b$ thì $b$ là ước của $a$ và $a$ là bội của $b$.', '$5$ is a divisor of $20$, and $20$ is a multiple of $5$.', '$5$ là ước của $20$, và $20$ là bội của $5$.'),
      ],
      [
        n('g6l8-n1', 'a \\vdots b', 'a is divisible by b', 'a chia hết cho b', 'International textbooks write $b \\mid a$ ($b$ divides $a$) instead of $a \\vdots b$.', 'Sách quốc tế thường viết $b \\mid a$ thay cho kí hiệu $a \\vdots b$ của Việt Nam.'),
      ],
      [
        e('g6l8-e1', 'describe', 'If every term in a sum is divisible by $m$, then the sum is divisible by $m$.', 'Nếu mọi số hạng của một tổng đều chia hết cho $m$ thì tổng chia hết cho $m$.'),
        e('g6l8-e2', 'question', 'Without calculating the sum, is $35 + 49 + 14$ divisible by $7$?', 'Không tính tổng, xét xem $35 + 49 + 14$ có chia hết cho $7$ không?'),
        e('g6l8-e3', 'present', 'Because $35 \\vdots 7$ and $12 \\not\\vdots 7$, the sum $35 + 12$ is not divisible by $7$.', 'Vì $35 \\vdots 7$ và $12 \\not\\vdots 7$ nên tổng $35 + 12$ không chia hết cho $7$.'),
      ],
      [
        ex(
          'g6l8-ex1',
          'Checking divisibility of a sum',
          'Xét tính chia hết của một tổng',
          'Determine whether $24 + 36 - 15$ is divisible by $6$.',
          'Xét xem $24 + 36 - 15$ có chia hết cho $6$ hay không.',
          [
            s('Step 1: Check each term', 'Bước 1: Kiểm tra từng số hạng', '$24 \\vdots 6$ and $36 \\vdots 6$, while $15$ is not divisible by $6$.', '$24 \\vdots 6$ và $36 \\vdots 6$, còn $15$ không chia hết cho $6$.'),
            s('Step 2: Apply the property', 'Bước 2: Áp dụng tính chất', 'Exactly one term is not divisible by $6$, so the whole expression is not divisible by $6$.', 'Có đúng một số hạng không chia hết cho $6$ nên biểu thức không chia hết cho $6$.'),
          ],
          '$24 + 36 - 15$ is not divisible by $6$.',
          '$24 + 36 - 15$ không chia hết cho $6$.'
        ),
      ],
      ['Ở Việt Nam viết $a \\vdots b$ ("a chia hết cho b"), còn trong tiếng Anh quốc tế hay viết $b \\mid a$ ("b divides a").']
    ),
    lesson(
      6, 2, 9,
      'Divisibility Rules (2, 3, 5, 9)',
      'Dấu hiệu chia hết',
      ['State divisibility rules for $2, 5, 3$, and $9$ in English.', 'Determine missing digits satisfying simultaneous divisibility conditions.'],
      ['Phát biểu dấu hiệu chia hết cho $2, 5, 3, 9$ bằng tiếng Anh.', 'Tìm chữ số thích hợp để số thỏa mãn đồng thời nhiều dấu hiệu chia hết.'],
      [
        v('g6l9-v1', 'units digit / last digit', 'n phr', 'chữ số tận cùng / chữ số hàng đơn vị', 'The rightmost digit of a natural number.', 'Chữ số ngoài cùng bên phải của một số tự nhiên.', 'Numbers with last digit $0$ or $5$ are divisible by $5$.', 'Các số có chữ số tận cùng là $0$ hoặc $5$ thì chia hết cho $5$.'),
        v('g6l9-v2', 'sum of digits', 'n phr', 'tổng các chữ số', 'Adding every digit of the number to test divisibility by $3$ or $9$.', 'Tổng giá trị tất cả các chữ số để kiểm tra chia hết cho $3$ hoặc $9$.', 'A number is divisible by $9$ if the sum of its digits is divisible by $9$.', 'Một số chia hết cho $9$ khi tổng các chữ số của nó chia hết cho $9$.'),
      ],
      [
        n('g6l9-n1', '\\overline{23*} \\vdots 2 \\text{ and } \\overline{23*} \\vdots 5', 'two hundred thirty-star is divisible by both two and five', 'số có ba chữ số 2 3 sao vừa chia hết cho 2 vừa chia hết cho 5'),
      ],
      [
        e('g6l9-e1', 'describe', 'An even number has last digit $0, 2, 4, 6,$ or $8$, so it is divisible by $2$.', 'Số chẵn có chữ số tận cùng là $0, 2, 4, 6$ hoặc $8$ nên chia hết cho $2$.'),
        e('g6l9-e2', 'question', 'If a number is divisible by $9$, is it automatically divisible by $3$?', 'Nếu một số chia hết cho $9$ thì nó có chia hết cho $3$ không?'),
        e('g6l9-e3', 'present', 'For $\\overline{4a5}$ to be divisible by $9$, the sum $4 + a + 5 = 9 + a$ must be divisible by $9$.', 'Để $\\overline{4a5}$ chia hết cho $9$, tổng $4 + a + 5 = 9 + a$ phải chia hết cho $9$.'),
      ],
      [
        ex(
          'g6l9-ex1',
          'Finding a missing digit',
          'Tìm chữ số thích hợp',
          'Find digit $*$ so that $\\overline{54*}$ is divisible by both $2$ and $3$.',
          'Tìm chữ số $*$ để số $\\overline{54*}$ chia hết cho cả $2$ và $3$.',
          [
            s('Step 1: Divisibility by $2$', 'Bước 1: Chia hết cho $2$', 'The last digit $*$ must belong to $\\{0, 2, 4, 6, 8\\}$.', 'Chữ số tận cùng $*$ thuộc $\\{0; 2; 4; 6; 8\\}$.'),
            s('Step 2: Divisibility by $3$', 'Bước 2: Chia hết cho $3$', 'The digit sum $5 + 4 + * = 9 + *$ must be divisible by $3$, so $* \\in \\{0, 3, 6, 9\\}$.', 'Tổng $5 + 4 + * = 9 + *$ chia hết cho $3$ nên $* \\in \\{0; 3; 6; 9\\}$.'),
          ],
          'Combining both conditions gives $* \\in \\{0, 6\\}$.',
          'Kết hợp cả hai điều kiện, ta được $* \\in \\{0; 6\\}$.'
        ),
      ],
      ['Thuật ngữ "even number" (số chẵn) và "odd number" (số lẻ) cần lặp lại thường xuyên.']
    ),
    lesson(
      6, 2, 10,
      'Prime Numbers',
      'Số nguyên tố',
      ['Distinguish prime numbers and composite numbers.', 'Perform prime factorization using factor trees or division columns.'],
      ['Phân biệt số nguyên tố và hợp số.', 'Phân tích một số ra thừa số nguyên tố.'],
      [
        v('g6l10-v1', 'prime number', 'n phr', 'số nguyên tố', 'A natural number greater than $1$ having only two divisors: $1$ and itself.', 'Số tự nhiên lớn hơn $1$ chỉ có hai ước là $1$ và chính nó.', '$2, 3, 5, 7, 11$ are the first five prime numbers.', '$2; 3; 5; 7; 11$ là năm số nguyên tố đầu tiên.'),
        v('g6l10-v2', 'composite number', 'n phr', 'hợp số', 'A natural number greater than $1$ that has more than two divisors.', 'Số tự nhiên lớn hơn $1$ có nhiều hơn hai ước.', '$0$ and $1$ are neither prime nor composite.', 'Số $0$ và số $1$ không là số nguyên tố và cũng không là hợp số.'),
        v('g6l10-v3', 'prime factorization', 'n phr', 'phân tích ra thừa số nguyên tố', 'Writing a composite number as a product of prime powers.', 'Viết một hợp số dưới dạng tích các thừa số nguyên tố.', 'The prime factorization of $60$ is $2^2 \\cdot 3 \\cdot 5$.', 'Phân tích $60$ ra thừa số nguyên tố được $2^2 \\cdot 3 \\cdot 5$.'),
      ],
      [
        n('g6l10-n1', '60 = 2^2 \\cdot 3 \\cdot 5', 'sixty equals two squared times three times five', 'sáu mươi bằng 2 bình phương nhân 3 nhân 5'),
      ],
      [
        e('g6l10-e1', 'describe', '$2$ is the only even prime number.', 'Số $2$ là số nguyên tố chẵn duy nhất.'),
        e('g6l10-e2', 'question', 'How do we factorize $84$ into prime factors?', 'Ta phân tích $84$ ra thừa số nguyên tố như thế nào?'),
        e('g6l10-e3', 'present', 'Dividing successively by prime numbers gives $84 = 2^2 \\cdot 3 \\cdot 7$.', 'Chia liên tiếp cho các số nguyên tố ta được $84 = 2^2 \\cdot 3 \\cdot 7$.'),
      ],
      [
        ex(
          'g6l10-ex1',
          'Prime factorization by vertical division',
          'Phân tích theo cột dọc',
          'Factorize $120$ into prime factors.',
          'Phân tích $120$ ra thừa số nguyên tố.',
          [
            s('Step 1: Divide by smallest primes', 'Bước 1: Chia cho các số nguyên tố từ bé đến lớn', '$120 : 2 = 60$, $60 : 2 = 30$, $30 : 2 = 15$, $15 : 3 = 5$, $5 : 5 = 1$.', '$120 : 2 = 60$, $60 : 2 = 30$, $30 : 2 = 15$, $15 : 3 = 5$, $5 : 5 = 1$.'),
            s('Step 2: Group repeated factors into powers', 'Bước 2: Viết gọn bằng lũy thừa', 'Write $120 = 2^3 \\cdot 3 \\cdot 5$.', 'Viết $120 = 2^3 \\cdot 3 \\cdot 5$.'),
          ],
          'The prime factorization of $120$ is $2^3 \\cdot 3 \\cdot 5$.',
          'Dạng phân tích ra thừa số nguyên tố của $120$ là $2^3 \\cdot 3 \\cdot 5$.'
        ),
      ],
      ['Nhấn mạnh $0$ và $1$ là ngoại lệ đặc biệt: "neither prime nor composite".']
    ),
    lesson(
      6, 2, 11,
      'Common Factors and Greatest Common Factor',
      'Ước chung và ước chung lớn nhất',
      ['Find common factors and the greatest common factor (GCF / HCF) via prime factorization.', 'Identify coprime numbers and simplify fractions.'],
      ['Tìm ước chung và ước chung lớn nhất (ƯCLN) bằng phân tích thừa số nguyên tố.', 'Nhận biết hai số nguyên tố cùng nhau và rút gọn phân số.'],
      [
        v('g6l11-v1', 'common factor / greatest common factor (GCF)', 'n phr', 'ước chung / ước chung lớn nhất (ƯCLN)', 'A common divisor of two or more numbers; the largest one is the GCF.', 'Số là ước của cả hai hay nhiều số; số lớn nhất là ƯCLN.', 'Find $\\gcd(24, 36)$.', 'Tìm ƯCLN của $24$ và $36$.'),
        v('g6l11-v2', 'coprime / relatively prime', 'adj phr', 'nguyên tố cùng nhau', 'Two numbers whose greatest common factor is $1$.', 'Hai số có ước chung lớn nhất bằng $1$.', '$8$ and $15$ are coprime because $\\gcd(8, 15) = 1$.', '$8$ và $15$ nguyên tố cùng nhau vì $\\text{ƯCLN}(8, 15) = 1$.'),
      ],
      [
        n('g6l11-n1', '\\gcd(24, 36) = 12', 'the greatest common factor of twenty-four and thirty-six is twelve', 'ước chung lớn nhất của 24 và 36 bằng 12', 'US uses GCF/GCD; UK uses HCF (highest common factor).', 'Tiếng Anh Mỹ dùng GCF hoặc GCD, tiếng Anh Anh dùng HCF.'),
      ],
      [
        e('g6l11-e1', 'describe', 'Select common prime factors, each with its smallest exponent, then multiply them.', 'Chọn các thừa số nguyên tố chung với số mũ nhỏ nhất rồi nhân lại.'),
        e('g6l11-e2', 'question', 'Is the fraction in simplest form yet?', 'Phân số này đã tối giản chưa?'),
        e('g6l11-e3', 'present', 'Dividing numerator and denominator by their GCF gives the irreducible fraction.', 'Chia cả tử và mẫu cho ƯCLN của chúng để được phân số tối giản.'),
      ],
      [
        ex(
          'g6l11-ex1',
          'Finding GCF by prime factorization',
          'Tìm ƯCLN bằng phân tích thừa số nguyên tố',
          'Find $\\gcd(36, 48)$ and simplify $\\frac{36}{48}$.',
          'Tìm $\\text{ƯCLN}(36, 48)$ và rút gọn phân số $\\frac{36}{48}$.',
          [
            s('Step 1: Factorize both numbers', 'Bước 1: Phân tích hai số', '$36 = 2^2 \\cdot 3^2$ and $48 = 2^4 \\cdot 3$.', '$36 = 2^2 \\cdot 3^2$ và $48 = 2^4 \\cdot 3$.'),
            s('Step 2: Take smallest common exponents', 'Bước 2: Chọn số mũ nhỏ nhất của thừa số chung', 'Common prime factors are $2$ and $3$; GCF is $2^2 \\cdot 3 = 12$.', 'Thừa số chung là $2$ và $3$; $\\text{ƯCLN} = 2^2 \\cdot 3 = 12$.'),
            s('Step 3: Simplify fraction', 'Bước 3: Rút gọn phân số', '$\\frac{36 : 12}{48 : 12} = \\frac{3}{4}$.', '$\\frac{36 : 12}{48 : 12} = \\frac{3}{4}$.'),
          ],
          'So $\\gcd(36, 48) = 12$ and $\\frac{36}{48} = \\frac{3}{4}$.',
          'Vậy $\\text{ƯCLN}(36, 48) = 12$ và $\\frac{36}{48} = \\frac{3}{4}$.'
        ),
      ],
      ['Tiếng Anh có 3 cách viết tương đương: GCF, GCD, HCF.']
    ),
    lesson(
      6, 2, 12,
      'Common Multiples and Least Common Multiple',
      'Bội chung và bội chung nhỏ nhất',
      ['Find the least common multiple (LCM) using prime factorization.', 'Apply LCM to find a common denominator of fractions and periodic meeting problems.'],
      ['Tìm bội chung nhỏ nhất (BCNN) bằng phân tích thừa số nguyên tố.', 'Ứng dụng BCNN để quy đồng mẫu số và giải bài toán chu kì.'],
      [
        v('g6l12-v1', 'common multiple / least common multiple (LCM)', 'n phr', 'bội chung / bội chung nhỏ nhất (BCNN)', 'The smallest positive number divisible by two or more given numbers.', 'Số nhỏ nhất khác $0$ chia hết cho tất cả các số đã cho.', 'Find $\\operatorname{lcm}(12, 18)$.', 'Tìm BCNN của $12$ và $18$.'),
        v('g6l12-v2', 'common denominator', 'n phr', 'mẫu số chung', 'A common multiple of the denominators of two or more fractions.', 'Bội chung của các mẫu số khi quy đồng phân số.', 'Use the LCM as the least common denominator.', 'Lấy BCNN làm mẫu số chung nhỏ nhất.'),
      ],
      [
        n('g6l12-n1', '\\operatorname{lcm}(12, 18) = 36', 'the least common multiple of twelve and eighteen is thirty-six', 'bội chung nhỏ nhất của 12 và 18 bằng 36'),
      ],
      [
        e('g6l12-e1', 'describe', 'For LCM, select both common and uncommon prime factors, each with its largest exponent.', 'Tìm BCNN thì chọn cả thừa số chung và riêng, lấy số mũ lớn nhất.'),
        e('g6l12-e2', 'question', 'After how many days will both ships next return to port together?', 'Sau ít nhất bao nhiêu ngày thì cả hai tàu lại cùng cập bến?'),
        e('g6l12-e3', 'present', 'All common multiples of $12$ and $18$ are multiples of $36$.', 'Mọi bội chung của $12$ và $18$ đều là bội của $36$.'),
      ],
      [
        ex(
          'g6l12-ex1',
          'Finding LCM and common multiples',
          'Tìm BCNN và các bội chung',
          'Find $\\operatorname{lcm}(10, 15)$ and list common multiples less than $100$.',
          'Tìm $\\text{BCNN}(10, 15)$ và các bội chung nhỏ hơn $100$.',
          [
            s('Step 1: Factorize', 'Bước 1: Phân tích', '$10 = 2 \\cdot 5$ and $15 = 3 \\cdot 5$.', '$10 = 2 \\cdot 5$ và $15 = 3 \\cdot 5$.'),
            s('Step 2: Multiply largest powers', 'Bước 2: Nhân các lũy thừa mũ lớn nhất', '$\\operatorname{lcm}(10, 15) = 2 \\cdot 3 \\cdot 5 = 30$.', '$\\text{BCNN}(10, 15) = 2 \\cdot 3 \\cdot 5 = 30$.'),
          ],
          'Common multiples below $100$ are $0, 30, 60, 90$.',
          'Các bội chung nhỏ hơn $100$ là $0; 30; 60; 90$.'
        ),
      ],
      ['So sánh rõ: GCF lấy thừa số CHUNG mũ NHỎ NHẤT; LCM lấy CHUNG VÀ RIÊNG mũ LỚN NHẤT.']
    ),
  ]),
  chapter(6, 3, 'Integers', 'Số nguyên', [
    lesson(
      6, 3, 13,
      'The Set of Integers',
      'Tập hợp các số nguyên',
      ['Read positive and negative integers in everyday contexts and on the number line.', 'Compare integers and define opposite numbers.'],
      ['Đọc số nguyên âm, số nguyên dương trong thực tiễn và trên trục số.', 'So sánh các số nguyên và xác định số đối.'],
      [
        v('g6l13-v1', 'negative integer / positive integer', 'n phr', 'số nguyên âm / số nguyên dương', 'Integers less than zero (e.g., $-3$) and greater than zero (e.g., $+5$).', 'Các số nguyên nhỏ hơn $0$ và lớn hơn $0$.', '$-5$ is read "negative five", representing $5^\\circ\\text{C}$ below zero.', '$-5$ đọc là âm năm, biểu thị $5^\\circ\\text{C}$ dưới $0$ độ.'),
        v('g6l13-v2', 'opposite numbers', 'n phr', 'hai số đối nhau', 'Two integers equidistant from $0$ on opposite sides of the number line.', 'Hai số nguyên nằm cách đều điểm $0$ về hai phía trên trục số.', 'The opposite of $-7$ is $7$.', 'Số đối của $-7$ là $7$.'),
      ],
      [
        n('g6l13-n1', '\\mathbb{Z} = \\{\\dots, -2, -1, 0, 1, 2, \\dots\\}', 'the set of integers', 'tập hợp các số nguyên Z'),
        n('g6l13-n2', '-12', 'negative twelve', 'âm mười hai'),
      ],
      [
        e('g6l13-e1', 'describe', 'Every negative integer is strictly less than $0$ and less than any positive integer.', 'Mọi số nguyên âm đều nhỏ hơn $0$ và nhỏ hơn mọi số nguyên dương.'),
        e('g6l13-e2', 'question', 'Which integer is greater: $-8$ or $-3$?', 'Giữa $-8$ và $-3$, số nguyên nào lớn hơn?'),
        e('g6l13-e3', 'present', 'Since $3 < 8$, we have $-3 > -8$.', 'Vì $3 < 8$ nên $-3 > -8$.'),
      ],
      [
        ex(
          'g6l13-ex1',
          'Ordering negative integers',
          'Sắp xếp các số nguyên âm',
          'Arrange $-10, 4, 0, -2, 7$ in ascending order.',
          'Sắp xếp các số $-10; 4; 0; -2; 7$ theo thứ tự tăng dần.',
          [
            s('Step 1: Compare negatives first', 'Bước 1: So sánh các số âm trước', 'Between $-10$ and $-2$, $-10$ lies further left so $-10 < -2$.', 'Giữa $-10$ và $-2$, $-10 < -2$.'),
            s('Step 2: Insert zero and positives', 'Bước 2: Xếp tiếp số 0 và số dương', 'Place $0 < 4 < 7$.', 'Đặt $0 < 4 < 7$.'),
          ],
          'Ascending order: $-10, -2, 0, 4, 7$.',
          'Thứ tự tăng dần: $-10; -2; 0; 4; 7$.'
        ),
      ],
      ['Khi đọc số âm đứng riêng, tiếng Anh chuẩn đọc "negative five" thay vì "minus five".']
    ),
    lesson(
      6, 3, 14,
      'Addition and Subtraction of Integers',
      'Phép cộng và phép trừ số nguyên',
      ['Add integers with the same sign and opposite signs.', 'Convert subtraction $a - b$ into adding the opposite $a + (-b)$.'],
      ['Cộng hai số nguyên cùng dấu và hai số nguyên khác dấu.', 'Chuyển phép trừ $a - b$ thành cộng với số đối $a + (-b)$.'],
      [
        v('g6l14-v1', 'same sign / opposite signs', 'n phr', 'cùng dấu / khác dấu', 'Two numbers both positive/negative, or one positive and one negative.', 'Hai số đều dương/đều âm, hoặc một dương một âm.', 'The sum of two opposite numbers is always $0$.', 'Tổng hai số đối nhau luôn bằng $0$.'),
        v('g6l14-v2', 'subtracting by adding the opposite', 'v phr', 'trừ bằng cách cộng số đối', 'Using the rule $a - b = a + (-b)$.', 'Áp dụng quy tắc $a - b = a + (-b)$.', 'To compute $3 - 8$, add $-8$ to $3$ to get $-5$.', 'Để tính $3 - 8$, lấy $3$ cộng $(-8)$ được $-5$.'),
      ],
      [
        n('g6l14-n1', 'a - b = a + (-b)', 'a minus b equals a plus negative b', 'a trừ b bằng a cộng âm b'),
      ],
      [
        e('g6l14-e1', 'describe', 'When adding two negative numbers, add their absolute values and keep the negative sign.', 'Cộng hai số nguyên âm: cộng hai phần số tự nhiên rồi đặt dấu trừ trước kết quả.'),
        e('g6l14-e2', 'question', 'How does the temperature change when it rises from $-4^\\circ\\text{C}$ to $7^\\circ\\text{C}$?', 'Nhiệt độ thay đổi bao nhiêu độ khi tăng từ $-4^\\circ\\text{C}$ lên $7^\\circ\\text{C}$?'),
        e('g6l14-e3', 'present', 'Rewriting subtraction as addition gives $12 - (-5) = 12 + 5 = 17$.', 'Đổi phép trừ thành cộng với số đối ta có $12 - (-5) = 12 + 5 = 17$.'),
      ],
      [
        ex(
          'g6l14-ex1',
          'Integer addition and subtraction',
          'Cộng trừ số nguyên',
          'Calculate $(-15) + 9 - (-6)$.',
          'Tính $(-15) + 9 - (-6)$.',
          [
            s('Step 1: Add opposite signs', 'Bước 1: Cộng hai số khác dấu', '$(-15) + 9 = -(15 - 9) = -6$.', '$(-15) + 9 = -(15 - 9) = -6$.'),
            s('Step 2: Subtract negative six', 'Bước 2: Trừ cho âm sáu', '$-6 - (-6) = -6 + 6 = 0$.', '$-6 - (-6) = -6 + 6 = 0$.'),
          ],
          'The final result is $0$.',
          'Kết quả cuối cùng bằng $0$.'
        ),
      ],
      ['Dùng tình huống nhiệt độ (temperature) hoặc độ cao (elevation) giúp học sinh hiểu nhanh cộng trừ số âm.']
    ),
    lesson(
      6, 3, 15,
      'The Bracket Rule',
      'Quy tắc dấu ngoặc',
      ['Remove parentheses preceded by $+$ or $-$ accurately.', 'Group integers cleverly using brackets to simplify sums.'],
      ['Bỏ dấu ngoặc khi đằng trước có dấu $+$ hoặc dấu $-$.', 'Đặt dấu ngoặc để nhóm số hạng hợp lí.'],
      [
        v('g6l15-v1', 'remove parentheses', 'v phr', 'bỏ dấu ngoặc', 'Eliminating grouping brackets while keeping or reversing signs of terms inside.', 'Mở ngoặc kèm giữ nguyên hoặc đổi dấu các số hạng bên trong.', 'When a minus sign precedes parentheses, reverse the sign of every term inside.', 'Khi bỏ ngoặc có dấu trừ đằng trước, phải đổi dấu tất cả các số hạng trong ngoặc.'),
        v('g6l15-v2', 'reverse the sign / keep the sign unchanged', 'v phr', 'đổi dấu / giữ nguyên dấu', 'Changing $+$ to $-$ and $-$ to $+$, or leaving them as they are.', 'Đổi dấu cộng thành trừ và trừ thành cộng, hoặc giữ nguyên.', 'Keep all signs unchanged after a plus sign.', 'Giữ nguyên dấu các số hạng khi đằng trước là dấu cộng.'),
      ],
      [
        n('g6l15-n1', '-(a + b - c) = -a - b + c', 'minus open parenthesis a plus b minus c close parenthesis equals negative a minus b plus c', 'trừ mở ngoặc a cộng b trừ c đóng ngoặc bằng âm a trừ b cộng c'),
      ],
      [
        e('g6l15-e1', 'describe', 'If there is a plus sign before parentheses, keep the sign of every term inside unchanged.', 'Trước ngoặc là dấu cộng thì giữ nguyên dấu mọi số hạng bên trong.'),
        e('g6l15-e2', 'question', 'Did we remember to flip the sign of $-5$ when removing the minus sign outside?', 'Khi bỏ ngoặc có dấu trừ đằng trước, dấu của $-5$ đã đổi chưa?'),
        e('g6l15-e3', 'present', 'Removing brackets gives $(27 - 51) - (27 - 151) = 27 - 51 - 27 + 151 = 100$.', 'Bỏ dấu ngoặc ta được $(27 - 51) - (27 - 151) = 27 - 51 - 27 + 151 = 100$.'),
      ],
      [
        ex(
          'g6l15-ex1',
          'Simplifying using bracket rules',
          'Rút gọn bằng quy tắc dấu ngoặc',
          'Compute $S = (135 - 48) - (135 + 52)$.',
          'Tính $S = (135 - 48) - (135 + 52)$.',
          [
            s('Step 1: Remove parentheses', 'Bước 1: Bỏ dấu ngoặc', '$S = 135 - 48 - 135 - 52$.', '$S = 135 - 48 - 135 - 52$.'),
            s('Step 2: Group opposites and round numbers', 'Bước 2: Nhóm số đối và nhóm tròn trăm', '$S = (135 - 135) - (48 + 52) = 0 - 100 = -100$.', '$S = (135 - 135) - (48 + 52) = 0 - 100 = -100$.'),
          ],
          'Thus, $S = -100$.',
          'Vậy $S = -100$.'
        ),
      ],
      ['Lỗi phổ biến: học sinh hay quên đổi dấu từ số hạng thứ hai trở đi sau ngoặc có dấu $-$.']
    ),
    lesson(
      6, 3, 16,
      'Multiplication of Integers',
      'Phép nhân số nguyên',
      ['Determine the sign of a product of two or more integers.', 'Apply distributive property to factor out negative or positive integers.'],
      ['Xác định dấu của tích hai hay nhiều số nguyên.', 'Vận dụng tính chất phân phối để tính hợp lí với số nguyên.'],
      [
        v('g6l16-v1', 'sign of a product', 'n phr', 'dấu của tích', 'Same signs yield a positive product; opposite signs yield a negative product.', 'Hai số cùng dấu cho tích dương; hai số khác dấu cho tích âm.', 'Negative times negative is positive.', 'Âm nhân âm ra dương.'),
        v('g6l16-v2', 'even number of negative factors', 'n phr', 'số chẵn thừa số âm', 'Counting negative factors tells immediately whether a multi-factor product is positive or negative.', 'Đếm số thừa số âm để biết ngay tích mang dấu dương hay âm.', 'An odd number of negative factors produces a negative product.', 'Số lẻ thừa số âm cho tích mang dấu âm.'),
      ],
      [
        n('g6l16-n1', '(-a) \\cdot (-b) = a \\cdot b', 'negative a times negative b equals a times b', 'âm a nhân âm b bằng a nhân b'),
      ],
      [
        e('g6l16-e1', 'describe', 'The product of two integers with opposite signs is always negative.', 'Tích của hai số nguyên khác dấu luôn là số nguyên âm.'),
        e('g6l16-e2', 'question', 'How many negative factors are in $(-2) \\cdot (-5) \\cdot (-3)$?', 'Có bao nhiêu thừa số âm trong tích $(-2) \\cdot (-5) \\cdot (-3)$?'),
        e('g6l16-e3', 'present', 'Factoring out $-15$ gives $(-15) \\cdot 62 + (-15) \\cdot 38 = (-15) \\cdot 100 = -1\\,500$.', 'Đặt $-15$ làm thừa số chung, ta có $(-15) \\cdot (62 + 38) = -1\\,500$.'),
      ],
      [
        ex(
          'g6l16-ex1',
          'Applying sign rules and distributive law',
          'Vận dụng quy tắc dấu và phân phối',
          'Calculate $(-12) \\cdot 47 + (-12) \\cdot 53$.',
          'Tính $(-12) \\cdot 47 + (-12) \\cdot 53$.',
          [
            s('Step 1: Factor out $-12$', 'Bước 1: Đặt thừa số chung $-12$', '$(-12) \\cdot (47 + 53)$.', '$(-12) \\cdot (47 + 53)$.'),
            s('Step 2: Multiply', 'Bước 2: Nhân kết quả', '$(-12) \\cdot 100 = -1\\,200$.', '$(-12) \\cdot 100 = -1\\,200$.'),
          ],
          'The product is $-1\\,200$.',
          'Giá trị biểu thức là $-1\\,200$.'
        ),
      ],
      ['Khẩu quyết ngắn gọn: "same signs -> positive; different signs -> negative".']
    ),
    lesson(
      6, 3, 17,
      'Exact Division, Divisors and Multiples of Integers',
      'Phép chia hết. Ước và bội của một số nguyên',
      ['Perform exact integer division with sign rules.', 'List both positive and negative integer divisors and multiples.'],
      ['Thực hiện phép chia hết hai số nguyên theo quy tắc dấu.', 'Tìm cả ước âm và ước dương, bội âm và bội dương của một số nguyên.'],
      [
        v('g6l17-v1', 'exact division', 'n phr', 'phép chia hết', 'Integer $a$ is divisible by $b \\ne 0$ when $a = b \\cdot q$ for some integer $q$.', 'Số nguyên $a$ chia hết cho $b \\ne 0$ nếu tồn tại số nguyên $q$ để $a = b \\cdot q$.', '$(-24) : (-6) = 4$.', '$(-24) : (-6) = 4$.'),
        v('g6l17-v2', 'integer divisors', 'n phr', 'các ước nguyên', 'If $d$ is a divisor of $a$, then $-d$ is also a divisor of $a$.', 'Nếu $d$ là ước của $a$ thì $-d$ cũng là ước của $a$.', 'The integer divisors of $6$ are $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.', 'Các ước nguyên của $6$ là $\\pm 1; \\pm 2; \\pm 3; \\pm 6$.'),
      ],
      [
        n('g6l17-n1', '\\mathbb{Z}\\text{-divisors of } 6: \\{\\pm 1, \\pm 2, \\pm 3, \\pm 6\\}', 'plus or minus one, two, three, and six', 'cộng trừ 1, cộng trừ 2, cộng trừ 3, cộng trừ 6'),
      ],
      [
        e('g6l17-e1', 'describe', 'Always include negative divisors when listing all integer divisors of a number.', 'Đừng quên các ước âm khi liệt kê tất cả ước nguyên của một số.'),
        e('g6l17-e2', 'question', 'Find all integers $x$ such that $x$ is a divisor of $8$.', 'Tìm các số nguyên $x$ biết $x$ là ước của $8$.'),
        e('g6l17-e3', 'present', 'Dividing a negative number by a positive number gives a negative quotient.', 'Chia một số âm cho một số dương ta được thương là số âm.'),
      ],
      [
        ex(
          'g6l17-ex1',
          'Finding integer divisors of an integer',
          'Tìm các ước nguyên của một số nguyên',
          'Find all integer divisors of $-10$ and three negative multiples of $4$.',
          'Tìm tất cả các ước nguyên của $-10$ và ba bội âm của $4$.',
          [
            s('Step 1: Positive divisors of $10$', 'Bước 1: Tìm các ước tự nhiên của $10$', 'Natural divisors are $1, 2, 5, 10$.', 'Các ước tự nhiên là $1; 2; 5; 10$.'),
            s('Step 2: Include opposites and list multiples', 'Bước 2: Lấy thêm số đối và tìm bội âm', 'Integer divisors: $\\pm 1, \\pm 2, \\pm 5, \\pm 10$. Negative multiples of $4$: $-4, -8, -12$.', 'Ước nguyên của $-10$: $\\pm 1; \\pm 2; \\pm 5; \\pm 10$. Ba bội âm của $4$: $-4; -8; -12$.'),
          ],
          'Every divisor comes in a positive-negative pair $\\pm d$.',
          'Mỗi ước tự nhiên đều đi kèm với số đối âm của nó.'
        ),
      ],
      ['Học sinh rất dễ sót ước âm; cần nhắc "integer divisors include both positive and negative ones".']
    ),
  ]),
  chapter(6, 4, 'Some Plane Shapes in Practice', 'Một số hình phẳng trong thực tiễn', [
    lesson(
      6, 4, 18,
      'Equilateral Triangles, Squares, and Regular Hexagons',
      'Hình tam giác đều, hình vuông, hình lục giác đều',
      ['Describe sides, angles, and diagonals of equilateral triangles, squares, and regular hexagons.', 'Use side lengths and angle measures ($60^\\circ, 90^\\circ, 120^\\circ$) correctly.'],
      ['Mô tả cạnh, góc, đường chéo của tam giác đều, hình vuông, lục giác đều.', 'Nêu đúng số đo góc ($60^\\circ; 90^\\circ; 120^\\circ$) bằng tiếng Anh.'],
      [
        v('g6l18-v1', 'equilateral triangle', 'n phr', 'tam giác đều', 'A triangle with three equal sides and three $60^\\circ$ angles.', 'Tam giác có ba cạnh bằng nhau và ba góc bằng $60^\\circ$.', 'Each angle of an equilateral triangle measures $60^\\circ$.', 'Mỗi góc của tam giác đều có số đo bằng $60^\\circ$.'),
        v('g6l18-v2', 'square', 'n', 'hình vuông', 'A quadrilateral with four equal sides, four right angles, and equal perpendicular diagonals.', 'Tứ giác có bốn cạnh bằng nhau, bốn góc vuông và hai đường chéo bằng nhau.', 'The two diagonals of a square are equal.', 'Hai đường chéo của hình vuông bằng nhau.'),
        v('g6l18-v3', 'regular hexagon', 'n phr', 'hình lục giác đều', 'A six-sided polygon with six equal sides and six $120^\\circ$ angles.', 'Hình có $6$ cạnh bằng nhau và $6$ góc bằng $120^\\circ$.', 'A regular hexagon can be divided into six equilateral triangles.', 'Hình lục giác đều có thể chia thành sáu tam giác đều.'),
      ],
      [
        n('g6l18-n1', '\\widehat{A} = \\widehat{B} = \\widehat{C} = 60^\\circ', 'angle A equals angle B equals angle C equals sixty degrees', 'góc A bằng góc B bằng góc C bằng 60 độ'),
      ],
      [
        e('g6l18-e1', 'describe', 'In a regular hexagon, the three main diagonals have equal lengths and meet at one center.', 'Trong hình lục giác đều, ba đường chéo chính bằng nhau và cắt nhau tại tâm.'),
        e('g6l18-e2', 'question', 'How many equilateral triangles make up a regular hexagon?', 'Một hình lục giác đều được ghép từ mấy tam giác đều?'),
        e('g6l18-e3', 'present', 'With side length $5\\text{ cm}$, the perimeter of the square is $4 \\times 5 = 20\\text{ cm}$.', 'Với cạnh $5\\text{ cm}$, chu vi hình vuông là $4 \\times 5 = 20\\text{ cm}$.'),
      ],
      [
        ex(
          'g6l18-ex1',
          'Properties of a regular hexagon',
          'Tính chất hình lục giác đều',
          'A regular hexagon $ABCDEF$ has side $AB = 4\\text{ cm}$. Find its perimeter and main diagonal length $AD$.',
          'Hình lục giác đều $ABCDEF$ có cạnh $AB = 4\\text{ cm}$. Tính chu vi và độ dài đường chéo chính $AD$.',
          [
            s('Step 1: Compute perimeter', 'Bước 1: Tính chu vi', 'All $6$ sides are equal, so $P = 6 \\times 4 = 24\\text{ cm}$.', 'Sáu cạnh bằng nhau nên chu vi $P = 6 \\times 4 = 24\\text{ cm}$.'),
            s('Step 2: Find main diagonal $AD$', 'Bước 2: Tính đường chéo chính $AD$', 'Center $O$ forms equilateral triangles of side $4\\text{ cm}$, so $AD = AO + OD = 4 + 4 = 8\\text{ cm}$.', 'Tâm $O$ tạo thành các tam giác đều cạnh $4\\text{ cm}$ nên $AD = 4 + 4 = 8\\text{ cm}$.'),
          ],
          'Perimeter is $24\\text{ cm}$ and main diagonal $AD = 8\\text{ cm}$.',
          'Chu vi bằng $24\\text{ cm}$ và đường chéo chính $AD = 8\\text{ cm}$.'
        ),
      ],
      ['Phát âm chú ý: `hexagon` /ˈheksəɡən/, `diagonal` /daɪˈæɡənəl/, `equilateral` /ˌiːkwɪˈlætərəl/.']
    ),
    lesson(
      6, 4, 19,
      'Rectangles, Rhombuses, Parallelograms, and Isosceles Trapezoids',
      'Hình chữ nhật, hình thoi, hình bình hành, hình thang cân',
      ['Identify opposite sides, opposite angles, parallel sides, and diagonals of each special quadrilateral.', 'Compare properties among the four shapes cleanly in English.'],
      ['Nhận biết cạnh đối, góc đối, cạnh song song và đường chéo của bốn tứ giác.', 'Phân biệt nhanh tính chất các hình bằng tiếng Anh.'],
      [
        v('g6l19-v1', 'rectangle', 'n', 'hình chữ nhật', 'A quadrilateral with four right angles, equal opposite sides, and equal diagonals.', 'Hình có bốn góc vuông, các cạnh đối bằng nhau và hai đường chéo bằng nhau.', 'Opposite sides of a rectangle are parallel and equal.', 'Các cạnh đối của hình chữ nhật song song và bằng nhau.'),
        v('g6l19-v2', 'rhombus', 'n', 'hình thoi', 'A quadrilateral with four equal sides and perpendicular diagonals.', 'Hình có bốn cạnh bằng nhau và hai đường chéo vuông góc với nhau.', 'The diagonals of a rhombus bisect each other at right angles.', 'Hai đường chéo của hình thoi vuông góc và cắt nhau tại trung điểm mỗi đường.'),
        v('g6l19-v3', 'parallelogram', 'n', 'hình bình hành', 'A quadrilateral whose opposite sides are parallel and equal.', 'Hình có các cạnh đối song song và bằng nhau.', 'Opposite angles of a parallelogram are equal.', 'Các góc đối của hình bình hành bằng nhau.'),
        v('g6l19-v4', 'isosceles trapezoid / isosceles trapezium', 'n phr', 'hình thang cân', 'A quadrilateral with one pair of parallel bases, equal legs, and equal diagonals.', 'Hình có hai cạnh đáy song song, hai cạnh bên bằng nhau và hai đường chéo bằng nhau.', 'In an isosceles trapezoid, the two base angles are equal.', 'Trong hình thang cân, hai góc kề một đáy bằng nhau.'),
      ],
      [
        n('g6l19-n1', 'AB \\parallel CD, \\quad AC = BD', 'A B is parallel to C D, and A C equals B D', 'AB song song với CD, và AC bằng BD'),
      ],
      [
        e('g6l19-e1', 'describe', 'Both a rectangle and an isosceles trapezoid have diagonals of equal length.', 'Cả hình chữ nhật và hình thang cân đều có hai đường chéo bằng nhau.'),
        e('g6l19-e2', 'question', 'Which two properties distinguish a rhombus from a general parallelogram?', 'Hai tính chất nào phân biệt hình thoi với hình bình hành thông thường?'),
        e('g6l19-e3', 'present', 'Since $ABCD$ is a parallelogram, $AB = CD$ and $AB \\parallel CD$.', 'Vì $ABCD$ là hình bình hành nên $AB = CD$ và $AB \\parallel CD$.'),
      ],
      [
        ex(
          'g6l19-ex1',
          'Comparing special quadrilaterals',
          'Nhận dạng qua tính chất đường chéo',
          'Identify a quadrilateral whose diagonals are equal and bisect each other, but are not perpendicular.',
          'Xác định loại hình có hai đường chéo bằng nhau, cắt nhau tại trung điểm mỗi đường nhưng không vuông góc.',
          [
            s('Step 1: Analyze bisecting diagonals', 'Bước 1: Xét tính chất cắt nhau tại trung điểm', 'It must be at least a parallelogram.', 'Hình đó là một hình bình hành.'),
            s('Step 2: Apply equal and non-perpendicular diagonals', 'Bước 2: Xét bằng nhau và không vuông góc', 'Equal diagonals make it a rectangle; non-perpendicular means it is not a square.', 'Hai đường chéo bằng nhau suy ra là hình chữ nhật; không vuông góc nên không phải hình vuông.'),
          ],
          'The shape is a non-square rectangle.',
          'Hình đó là hình chữ nhật (không phải hình vuông).'
        ),
      ],
      ['Tiếng Anh Mỹ gọi hình thang là `trapezoid`, tiếng Anh Anh gọi là `trapezium`.']
    ),
    lesson(
      6, 4, 20,
      'Perimeter and Area of Some Quadrilaterals',
      'Chu vi và diện tích của một số tứ giác đã học',
      ['State and apply perimeter and area formulas for rectangles, squares, parallelograms, rhombuses, and trapezoids.', 'Solve compound-area practical problems with consistent units.'],
      ['Phát biểu và vận dụng công thức tính chu vi, diện tích các tứ giác.', 'Giải bài toán thực tế có đổi đơn vị đo độ dài và diện tích.'],
      [
        v('g6l20-v1', 'perimeter / area', 'n', 'chu vi / diện tích', 'Total boundary length ($P$) and enclosed surface size ($S$ or $A$).', 'Tổng độ dài đường bao ($C$ hoặc $P$) và phần bề mặt bên trong ($S$).', 'The area of a parallelogram is base times height.', 'Diện tích hình bình hành bằng cạnh đáy nhân chiều cao.'),
        v('g6l20-v2', 'base / height (altitude)', 'n', 'đáy / chiều cao', 'A reference side and the perpendicular distance to the opposite side or vertex.', 'Cạnh đáy và khoảng cách vuông góc từ đỉnh hoặc cạnh đối diện.', 'The area of a trapezoid is half the sum of the two bases times the height.', 'Diện tích hình thang bằng nửa tổng hai đáy nhân chiều cao.'),
      ],
      [
        n('g6l20-n1', 'S = \\frac{(a + b) \\cdot h}{2}', 'area equals open parenthesis a plus b close parenthesis times h, all over two', 'diện tích S bằng tổng hai đáy a cộng b nhân chiều cao h rồi chia 2'),
        n('g6l20-n2', 'S_{\\text{rhombus}} = \\frac{1}{2} d_1 d_2', 'area equals one half times diagonal one times diagonal two', 'diện tích hình thoi bằng một phần hai tích hai đường chéo'),
      ],
      [
        e('g6l20-e1', 'describe', 'The area of a rhombus equals half the product of its two diagonals.', 'Diện tích hình thoi bằng nửa tích độ dài hai đường chéo.'),
        e('g6l20-e2', 'question', 'Are all given lengths in the same unit before we substitute into the formula?', 'Các độ dài đã cùng đơn vị trước khi thay vào công thức chưa?'),
        e('g6l20-e3', 'present', 'Converting $2\\text{ dm}$ to $20\\text{ cm}$, the area of the rhombus is $\\frac{1}{2} \\cdot 20 \\cdot 14 = 140\\text{ cm}^2$.', 'Đổi $2\\text{ dm} = 20\\text{ cm}$, diện tích hình thoi là $\\frac{1}{2} \\cdot 20 \\cdot 14 = 140\\text{ cm}^2$.'),
      ],
      [
        ex(
          'g6l20-ex1',
          'Area of a trapezoid courtyard',
          'Tính diện tích mảnh đất hình thang',
          'A trapezoidal garden has bases $12\\text{ m}$ and $8\\text{ m}$, and height $5\\text{ m}$. Find its area.',
          'Một khu vườn hình thang có hai đáy $12\\text{ m}$ và $8\\text{ m}$, chiều cao $5\\text{ m}$. Tính diện tích.',
          [
            s('Step 1: Recall formula', 'Bước 1: Nhớ lại công thức', '$S = \\frac{(a + b) \\cdot h}{2}$.', '$S = \\frac{(a + b) \\cdot h}{2}$.'),
            s('Step 2: Substitute values', 'Bước 2: Thay số và tính', '$S = \\frac{(12 + 8) \\cdot 5}{2} = \\frac{20 \\cdot 5}{2} = 50\\text{ m}^2$.', '$S = \\frac{(12 + 8) \\cdot 5}{2} = 50\\text{ m}^2$.'),
          ],
          'The area of the garden is $50\\text{ m}^2$.',
          'Diện tích khu vườn là $50\\text{ m}^2$.'
        ),
      ],
      ['Tiếng Anh thường kí hiệu diện tích là $A$ (Area), còn Việt Nam dùng $S$.']
    ),
  ]),
  chapter(6, 5, 'Symmetry of Plane Shapes in Nature', 'Tính đối xứng của hình phẳng trong tự nhiên', [
    lesson(
      6, 5, 21,
      'Shapes with Lines of Symmetry',
      'Hình có trục đối xứng',
      ['Identify axes/lines of symmetry of letters, polygons, and circles.', 'Draw and count lines of symmetry accurately.'],
      ['Nhận biết trục đối xứng của chữ cái, đa giác và hình tròn.', 'Đếm đúng số trục đối xứng của các hình quen thuộc.'],
      [
        v('g6l21-v1', 'line of symmetry / axis of symmetry', 'n phr', 'trục đối xứng', 'A line that divides a shape into two mirror-image halves when folded.', 'Đường thẳng chia hình thành hai nửa trùng khít khi gấp theo đường đó.', 'An isosceles trapezoid has $1$ line of symmetry.', 'Hình thang cân có $1$ trục đối xứng.'),
        v('g6l21-v2', 'symmetric across a line', 'adj phr', 'đối xứng trục', 'Matching point-for-point on opposite sides of the symmetry axis.', 'Hai phần đối xứng qua đường thẳng trục.', 'A circle has infinitely many lines of symmetry.', 'Hình tròn có vô số trục đối xứng.'),
      ],
      [
        n('g6l21-n1', '\\text{Square: } 4 \\text{ axes}; \\; \\text{Rectangle: } 2 \\text{ axes}', 'a square has four lines of symmetry, and a rectangle has two', 'hình vuông có 4 trục đối xứng, hình chữ nhật có 2 trục đối xứng'),
      ],
      [
        e('g6l21-e1', 'describe', 'If folding along line $d$ makes one half coincide exactly with the other, $d$ is a line of symmetry.', 'Nếu gấp hình theo đường thẳng $d$ mà hai nửa trùng khít nhau thì $d$ là trục đối xứng.'),
        e('g6l21-e2', 'question', 'Is the diagonal of a non-square rectangle a line of symmetry?', 'Đường chéo của hình chữ nhật (không phải hình vuông) có phải trục đối xứng không?'),
        e('g6l21-e3', 'present', 'A general parallelogram has no line of symmetry.', 'Hình bình hành thông thường không có trục đối xứng nào.'),
      ],
      [
        ex(
          'g6l21-ex1',
          'Counting lines of symmetry',
          'Đếm số trục đối xứng',
          'How many lines of symmetry do a regular triangle, a rhombus, and a circle each have?',
          'Tam giác đều, hình thoi và hình tròn mỗi hình có bao nhiêu trục đối xứng?',
          [
            s('Step 1: Equilateral triangle & rhombus', 'Bước 1: Tam giác đều và hình thoi', 'Equilateral triangle has $3$ lines; rhombus has $2$ lines (its two diagonals).', 'Tam giác đều có $3$ trục; hình thoi có $2$ trục (hai đường chéo).'),
            s('Step 2: Circle', 'Bước 2: Hình tròn', 'Every line passing through the center of a circle is a line of symmetry, so infinitely many.', 'Mọi đường thẳng đi qua tâm hình tròn đều là trục đối xứng nên có vô số.'),
          ],
          'Counts are $3$, $2$, and infinitely many respectively.',
          'Số trục đối xứng lần lượt là $3$, $2$ và vô số.'
        ),
      ],
      ['Học sinh hay nhầm đường chéo hình chữ nhật là trục đối xứng; nên minh họa bằng gấp giấy.']
    ),
    lesson(
      6, 5, 22,
      'Shapes with a Centre of Symmetry',
      'Hình có tâm đối xứng',
      ['Recognize point symmetry (180-degree rotational symmetry) around a center.', 'Distinguish shapes having line symmetry, centre symmetry, or both.'],
      ['Nhận biết tâm đối xứng (quay $180^\\circ$ quanh tâm trùng lại chính nó).', 'Phân biệt hình có trục đối xứng và hình có tâm đối xứng.'],
      [
        v('g6l22-v1', 'centre of symmetry / point of symmetry', 'n phr', 'tâm đối xứng', 'A point $O$ such that rotating the shape $180^\\circ$ around $O$ maps it onto itself.', 'Điểm $O$ sao cho quay hình $180^\\circ$ quanh $O$ thì hình chồng khít lên vị trí ban đầu.', 'The intersection of diagonals of a parallelogram is its centre of symmetry.', 'Giao điểm hai đường chéo của hình bình hành là tâm đối xứng của nó.'),
        v('g6l22-v2', 'half-turn / 180-degree rotation', 'n phr', 'phép quay nửa vòng ($180^\\circ$)', 'Turning a figure half a full circle around point $O$.', 'Quay hình một góc $180^\\circ$ quanh điểm $O$.', 'Letter S has a centre of symmetry, though it has no line of symmetry.', 'Chữ cái S có tâm đối xứng nhưng không có trục đối xứng.'),
      ],
      [
        n('g6l22-n1', 'O \\text{ is the midpoint of } AA\'', 'O is the midpoint of segment A A prime', 'O là trung điểm của đoạn thẳng A A phẩy'),
      ],
      [
        e('g6l22-e1', 'describe', 'An equilateral triangle has $3$ lines of symmetry, yet it has no centre of symmetry.', 'Tam giác đều có $3$ trục đối xứng nhưng không có tâm đối xứng.'),
        e('g6l22-e2', 'question', 'Does a regular hexagon have both lines of symmetry and a centre of symmetry?', 'Hình lục giác đều có cả trục đối xứng và tâm đối xứng đúng không?'),
        e('g6l22-e3', 'present', 'The parallelogram is symmetric about the intersection $O$ of its diagonals.', 'Hình bình hành nhận giao điểm $O$ của hai đường chéo làm tâm đối xứng.'),
      ],
      [
        ex(
          'g6l22-ex1',
          'Classifying symmetry of capital letters',
          'Phân loại tính đối xứng của chữ cái',
          'Classify the capital letters H, A, N, and M by line symmetry and centre symmetry.',
          'Phân loại các chữ in hoa H, A, N, M theo trục đối xứng và tâm đối xứng.',
          [
            s('Step 1: Check H and A', 'Bước 1: Xét chữ H và A', 'H has $2$ lines of symmetry and $1$ centre of symmetry; A has $1$ vertical line of symmetry only.', 'H có cả $2$ trục và $1$ tâm đối xứng; A chỉ có $1$ trục đối xứng.'),
            s('Step 2: Check N and M', 'Bước 2: Xét chữ N và M', 'N has a centre of symmetry only (no line); M has $1$ line of symmetry only.', 'N chỉ có tâm đối xứng; M chỉ có $1$ trục đối xứng.'),
          ],
          'H has both; A and M have line symmetry; N has centre symmetry.',
          'H có cả hai; A và M chỉ có trục đối xứng; N chỉ có tâm đối xứng.'
        ),
      ],
      ['Chính tả: UK viết `centre`, US viết `center`.']
    ),
  ]),
];
