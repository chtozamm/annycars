<motion.div
        className="mx-auto flex w-full max-w-md flex-col justify-center"
        initial={{ opacity: 0, y: "10px" }}
        animate={{
          opacity: 1,
          y: "0px",
          transition: {
            duration: 0.8,
            type: "tween",
            ease: "easeOut",
            delay: 0.5,
          },
        }}
      >
        {/* Add new car */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="mb-6 flex items-center gap-1.5"
              variant="outline"
            >
              <svg
                className="mt-0.5 h-4 w-4"
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
              Добавить автомобиль
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-fit">
            <DialogHeader>
              <DialogTitle>Добавить автомобиль</DialogTitle>
              <DialogDescription>
                Необходимо добавить название и ссылку на объявление.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="name"
                  className="break-words text-right"
                >
                  Название
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="year"
                  className="break-words text-right"
                >
                  Год выпуска
                </Label>
                <Input
                  id="year"
                  className="col-span-3"
                  value={formYear}
                  onChange={(e) => setFormYear(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="link"
                  className="break-words text-right"
                >
                  Объявление
                </Label>
                <Input
                  id="link"
                  className="col-span-3"
                  placeholder="https://"
                  required
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="image"
                  className="break-words text-right"
                >
                  Фото
                </Label>
                <Input
                  id="image"
                  className="col-span-3"
                  placeholder="https://"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                />
              </div>
              <div className="relative grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="price"
                  className="break-words text-right"
                >
                  Цена
                </Label>
                <Input
                  id="price"
                  className="col-span-3 pr-10"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                />
                <span className="absolute right-4 top-2">₽</span>
              </div>
              <div className="relative grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="mileage"
                  className="break-words text-right"
                >
                  Пробег
                </Label>
                <Input
                  id="mileage"
                  className="col-span-3 pr-10"
                  value={formMileage}
                  onChange={(e) => setFormMileage(e.target.value)}
                />
                <span className="absolute right-3 top-2">км</span>
              </div>
              <div className="relative grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="seller"
                  className="break-words text-right"
                >
                  Продавец
                </Label>
                <Input
                  id="seller"
                  className="col-span-3"
                  value={formSeller}
                  onChange={(e) => setFormSeller(e.target.value)}
                />
              </div>
              <div className="relative grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="advantages"
                  className="break-words text-right"
                >
                  Преимущества
                </Label>
                <Input
                  id="advantages"
                  className="col-span-3"
                  value={formAdvantages}
                  onChange={(e) => setFormAdvantages(e.target.value)}
                  placeholder="через запятую"
                />
              </div>
              <div className="relative grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="disadvantages"

                  className="break-words text-right"
                >
                  Недостатки
                </Label>
                <Input
                  id="disadvantages"
                  className="col-span-3"
                  value={formDisadvantages}
                  onChange={(e) => setFormDisadvantages(e.target.value)}
                  placeholder="через запятую"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit" onClick={() => handleAddCar()}>
                  Добавить
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Search */}
        <div className="relative h-fit w-full max-w-md">
          <Input
            type="text"
            value={searchQuery}
            placeholder="Поиск по названию"
            className="mb-3 w-full max-w-md pl-9"
            ref={searchRef}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (filter === "Все продавцы") {
                const filtered = [...data].filter((car: Car) =>
                  car.name.toLowerCase().includes(e.target.value.toLowerCase()),
                );
                addOptimisticCars(filtered);
              } else {
                const filtered = [...data].filter(
                  (car: Car) =>
                    car.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()) &&
                    car.seller === filter,
                );
                addOptimisticCars(filtered);
              }
            }}
          />
          <svg
            fill="none"
            height="24"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
            width="24"
            className="pointer-events-none absolute left-3 top-3 h-4 w-4 select-none text-gray-500"
          >
            <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z" />
            <path d="M16 16l4.5 4.5" />
          </svg>
          {searchRef?.current?.value && (
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => {
                searchRef!.current!.value = "";
                setSearchQuery("");
                if (filter === "Все продавцы") {
                  addOptimisticCars(data);
                } else {
                  addOptimisticCars(
                    [...data].filter((car: Car) => car.seller === filter),
                  );
                }
              }}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {/* Filter */}
        <Select
          value={filter}
          defaultValue="Все продавцы"
          onValueChange={(value) => setFilter(value)}
        >
          <SelectTrigger className="relative mb-3 w-full max-w-md pl-9">
            <svg
              className="pointer-events-none absolute left-3 top-3 h-4 w-4 select-none text-gray-500"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            <SelectValue
              placeholder="Выбрать магазин"
              className="placeholder:text-gray-400"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Все продавцы">Все продавцы</SelectItem>
            {sellers.map((seller) => (
              <SelectItem key={seller} value={seller}>
                {seller}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Sort */}
        <Select
          value={sort}
          defaultValue="created_at"
          onValueChange={(value) => {
            switch (value) {
              case "created_at":
                setSort("created_at");
                break;
              case "year":
                setSort("year");
                break;
              case "mileage":
                setSort("mileage");
                break;
              case "price":
                setSort("price");
                break;
              default:
                break;
            }
          }}
        >
          <SelectTrigger className="relative mb-6 w-full max-w-md pl-9">
            <svg
              className="pointer-events-none absolute left-3 top-3 h-4 w-4 select-none text-gray-500"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M15 18H3M21 6H3M17 12H3" />
            </svg>
            <SelectValue
              placeholder="по дате добавления"
              className="placeholder:text-gray-400"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem defaultChecked value="created_at">
              по дате добавления
            </SelectItem>
            <SelectItem value="year">по году выпуска</SelectItem>
            <SelectItem value="mileage">по пробегу</SelectItem>
            <SelectItem value="price">по цене</SelectItem>
          </SelectContent>
        </Select>
        {/* Show sold cars */}
        <div className="mx-auto mb-6 flex w-fit items-center gap-1.5">
          <Input
            id="show-sold"
            className="w-fit accent-black"
            type="checkbox"
            checked={showSoldCars}
            onChange={() => setShowSoldCars(!showSoldCars)}
          />
          <Label htmlFor="show-sold">Показать проданные автомобили</Label>
        </div>
        {/* Reset filters */}
        <Button
          className="mb-6 w-full max-w-md"
          onDoubleClickCapture={(e) => {
            resetFilters();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              resetFilters();
            }
          }}
        >
          Сбросить фильтры
        </Button>
      </motion.div>